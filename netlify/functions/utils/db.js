import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NETLIFY_DATABASE_URL);

// 初始化数据库表
export async function initDatabase() {
  try {
    // 检查表是否存在，避免重复创建
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'page_views'
      )
    `;
    
    if (!tableExists[0].exists) {
      // 访问记录表
      await sql`
        CREATE TABLE page_views (
          id SERIAL PRIMARY KEY,
          ip_address VARCHAR(45),
          user_agent TEXT,
          page_url VARCHAR(255),
          referrer VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }

    // 公司离谱事件表
    const companyEventsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'company_events'
      )
    `;
    
    if (!companyEventsExists[0].exists) {
      await sql`
        CREATE TABLE company_events (
          id SERIAL PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          description TEXT NOT NULL,
          severity VARCHAR(20) NOT NULL CHECK (severity IN ('低', '中', '高', '极高')),
          images JSONB DEFAULT '[]',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }

    // CTO黑历史表
    const ctoHistoryExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'cto_history'
      )
    `;
    
    if (!ctoHistoryExists[0].exists) {
      await sql`
        CREATE TABLE cto_history (
          id SERIAL PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          description TEXT NOT NULL,
          images JSONB DEFAULT '[]',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }

    // 评论表
    const commentsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'comments'
      )
    `;
    
    if (!commentsExists[0].exists) {
      await sql`
        CREATE TABLE comments (
          id SERIAL PRIMARY KEY,
          author VARCHAR(100) NOT NULL,
          content TEXT NOT NULL,
          ip_address VARCHAR(45),
          user_agent TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }

    // 事件日志表
    const eventLogsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'event_logs'
      )
    `;
    
    if (!eventLogsExists[0].exists) {
      await sql`
        CREATE TABLE event_logs (
          id SERIAL PRIMARY KEY,
          event_type VARCHAR(50),
          event_data JSONB,
          ip_address VARCHAR(45),
          user_agent TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }

    console.log('数据库表初始化完成');
  } catch (error) {
    console.error('数据库初始化失败:', error);
    // 不重新抛出错误，允许函数继续执行
  }
}

// 记录页面访问
export async function logPageView(data) {
  try {
    const { ip, userAgent, pageUrl, referrer } = data;
    await sql`
      INSERT INTO page_views (ip_address, user_agent, page_url, referrer)
      VALUES (${ip}, ${userAgent}, ${pageUrl}, ${referrer})
    `;
    return { success: true };
  } catch (error) {
    console.error('记录页面访问失败:', error);
    return { success: false, error: error.message };
  }
}

// 获取页面访问统计
export async function getPageViewStats() {
  try {
    const totalViews = await sql`
      SELECT COUNT(*) as total FROM page_views
    `;
    
    const todayViews = await sql`
      SELECT COUNT(*) as today FROM page_views 
      WHERE DATE(created_at) = CURRENT_DATE
    `;
    
    const weeklyViews = await sql`
      SELECT COUNT(*) as weekly FROM page_views 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    `;

    return {
      success: true,
      data: {
        total: parseInt(totalViews[0].total),
        today: parseInt(todayViews[0].today),
        weekly: parseInt(weeklyViews[0].weekly)
      }
    };
  } catch (error) {
    console.error('获取访问统计失败:', error);
    return { success: false, error: error.message };
  }
}

// 获取页面统计数据（包括访问量和事件数量）
export async function getPageStats() {
  try {
    const totalViews = await sql`
      SELECT COUNT(*) as total FROM page_views
    `;
    
    const totalEvents = await sql`
      SELECT COUNT(*) as total FROM company_events
    `;

    return {
      success: true,
      data: {
        viewCount: parseInt(totalViews[0].total),
        eventCount: parseInt(totalEvents[0].total)
      }
    };
  } catch (error) {
    console.error('获取页面统计失败:', error);
    return { success: false, error: error.message };
  }
}

// 获取公司事件列表（分页）
export async function getCompanyEvents(page = 1, limit = 6) {
  try {
    const offset = (page - 1) * limit;
    
    const events = await sql`
      SELECT id, title, description, severity, images, created_at
      FROM company_events 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    const totalCount = await sql`
      SELECT COUNT(*) as total FROM company_events
    `;
    
    return {
      success: true,
      data: {
        events: events,
        pagination: {
          current: page,
          total: Math.ceil(parseInt(totalCount[0].total) / limit),
          hasNext: page * limit < parseInt(totalCount[0].total),
          hasPrev: page > 1
        }
      }
    };
  } catch (error) {
    console.error('获取公司事件失败:', error);
    return { success: false, error: error.message };
  }
}

// 处理图片数据，限制存储大小
function processImagesForStorage(images) {
  if (!images || !Array.isArray(images)) {
    return [];
  }
  
  // 限制每个图片的最大存储大小和总数量
  const maxImageSize = 2 * 1024 * 1024; // 2MB per image for storage
  const maxImages = 5;
  
  return images.slice(0, maxImages).map((img, index) => {
    let imageData = '';
    let mimeType = '';
    
    // 处理两种格式的图片数据
    if (typeof img === 'string' && img.startsWith('data:image/')) {
      // 格式1: 完整的data:image/xxx;base64,xxx字符串（公司事件）
      imageData = img;
      const formatMatch = img.match(/data:image\/(\w+);/);
      mimeType = formatMatch ? `image/${formatMatch[1]}` : 'image/jpeg';
    } else if (typeof img === 'object' && img.data && img.type) {
      // 格式2: {data: base64String, type: mimeType}对象（CTO黑历史）
      imageData = `data:${img.type};base64,${img.data}`;
      mimeType = img.type;
    } else {
      return null;
    }
    
    // 如果图片过大，返回压缩提示而不是完整数据
    const estimatedSize = imageData.length * 0.75;
    if (estimatedSize > maxImageSize) {
      // 提取图片格式信息
      const format = mimeType.split('/')[1]?.toUpperCase() || 'UNKNOWN';
      
      return {
        type: 'large_image_placeholder',
        format: format,
        originalSize: Math.round(estimatedSize / (1024 * 1024) * 100) / 100,
        message: `图片${index + 1} (${format}, ${Math.round(estimatedSize / (1024 * 1024) * 100) / 100}MB) - 已上传但因大小限制未完整存储`
      };
    }
    
    return imageData;
  }).filter(img => img !== null);
}

// 添加公司事件
export async function addCompanyEvent(data) {
  try {
    const { title, description, severity, images } = data;
    
    if (description.length > 300) {
      return { success: false, error: '描述不能超过300字' };
    }
    
    // 处理图片数据
    const processedImages = processImagesForStorage(images);
    
    const result = await sql`
      INSERT INTO company_events (title, description, severity, images)
      VALUES (${title}, ${description}, ${severity}, ${JSON.stringify(processedImages)})
      RETURNING id
    `;
    
    return { success: true, data: { id: result[0].id } };
  } catch (error) {
    console.error('添加公司事件失败:', error);
    return { success: false, error: error.message };
  }
}

// 获取CTO黑历史列表（分页）
export async function getCtoHistory(page = 1, limit = 6) {
  try {
    const offset = (page - 1) * limit;
    
    const history = await sql`
      SELECT id, title, description, images, created_at
      FROM cto_history 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    const totalCount = await sql`
      SELECT COUNT(*) as total FROM cto_history
    `;
    
    return {
      success: true,
      data: {
        history: history,
        pagination: {
          current: page,
          total: Math.ceil(parseInt(totalCount[0].total) / limit),
          hasNext: page * limit < parseInt(totalCount[0].total),
          hasPrev: page > 1
        }
      }
    };
  } catch (error) {
    console.error('获取CTO黑历史失败:', error);
    return { success: false, error: error.message };
  }
}

// 添加CTO黑历史
export async function addCtoHistory(data) {
  try {
    const { title, description, images } = data;
    
    // 处理图片数据
    const processedImages = processImagesForStorage(images);
    
    const result = await sql`
      INSERT INTO cto_history (title, description, images)
      VALUES (${title}, ${description}, ${JSON.stringify(processedImages)})
      RETURNING id
    `;
    
    return { success: true, data: { id: result[0].id } };
  } catch (error) {
    console.error('添加CTO黑历史失败:', error);
    return { success: false, error: error.message };
  }
}

// 获取评论列表（分页）
export async function getComments(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;
    
    const comments = await sql`
      SELECT id, author, content, created_at
      FROM comments 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    const totalCount = await sql`
      SELECT COUNT(*) as total FROM comments
    `;
    
    return {
      success: true,
      data: {
        comments: comments,
        pagination: {
          current: page,
          total: Math.ceil(parseInt(totalCount[0].total) / limit),
          hasNext: page * limit < parseInt(totalCount[0].total),
          hasPrev: page > 1
        }
      }
    };
  } catch (error) {
    console.error('获取评论失败:', error);
    return { success: false, error: error.message };
  }
}

// 添加评论
export async function addComment(data) {
  try {
    const { author, content, ip, userAgent } = data;
    
    if (content.length > 200) {
      return { success: false, error: '评论不能超过200字' };
    }
    
    const result = await sql`
      INSERT INTO comments (author, content, ip_address, user_agent)
      VALUES (${author}, ${content}, ${ip}, ${userAgent})
      RETURNING id
    `;
    
    return { success: true, data: { id: result[0].id } };
  } catch (error) {
    console.error('添加评论失败:', error);
    return { success: false, error: error.message };
  }
}

// 记录事件
export async function logEvent(eventType, eventData, ip, userAgent) {
  try {
    await sql`
      INSERT INTO event_logs (event_type, event_data, ip_address, user_agent)
      VALUES (${eventType}, ${JSON.stringify(eventData)}, ${ip}, ${userAgent})
    `;
    return { success: true };
  } catch (error) {
    console.error('记录事件失败:', error);
    return { success: false, error: error.message };
  }
}

export { sql };
