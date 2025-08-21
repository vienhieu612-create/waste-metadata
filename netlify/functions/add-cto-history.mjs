import { addCtoHistory, logEvent, initDatabase } from './utils/db.js';

// 验证验证码
function validateCaptcha(userInput, correctAnswer) {
  return userInput.toUpperCase() === correctAnswer.toUpperCase();
}

export default async function handler(event, context) {
  // 确保数据库表已初始化
  try {
    await initDatabase();
  } catch (error) {
    console.log('数据库初始化警告:', error.message);
  }
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: '只支持POST请求' })
      };
    }

    const body = JSON.parse(event.body || '{}');
    const { title, description, images, captcha, captchaAnswer } = body;

    // 验证必填字段
    if (!title || !description) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: '标题和描述为必填项'
        })
      };
    }
    
    // 验证图片数据
    if (images && Array.isArray(images)) {
      if (images.length > 5) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: '最多只能上传5张图片',
            code: 'TOO_MANY_IMAGES'
          })
        };
      }
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (typeof image !== 'string') {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              error: `第${i + 1}张图片数据格式无效`,
              code: 'INVALID_IMAGE_TYPE'
            })
          };
        }
        
        if (!image.startsWith('data:image/')) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              error: `第${i + 1}张图片不是有效的base64图片格式`,
              code: 'INVALID_IMAGE_FORMAT'
            })
          };
        }
        
        // 检查支持的图片格式
        const supportedFormats = ['data:image/jpeg', 'data:image/jpg', 'data:image/png', 'data:image/gif'];
        const isSupported = supportedFormats.some(format => image.startsWith(format));
        if (!isSupported) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              error: `第${i + 1}张图片格式不支持，只支持 JPG、PNG、GIF 格式`,
              code: 'UNSUPPORTED_IMAGE_FORMAT'
            })
          };
        }
        
        // 检查图片大小（base64编码后的大小约为原始大小的4/3）
        const sizeInBytes = (image.length * 3) / 4;
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (sizeInBytes > maxSize) {
          const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              error: `第${i + 1}张图片大小为${sizeMB}MB，超过5MB限制`,
              code: 'IMAGE_TOO_LARGE',
              size: sizeMB
            })
          };
        }
      }
    }

    // 验证验证码
    if (!validateCaptcha(captcha, captchaAnswer)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: '验证码错误'
        })
      };
    }

    // 获取客户端信息
    const ip = event.headers['client-ip'] || 
               event.headers['x-forwarded-for'] || 
               event.headers['x-real-ip'] || 
               'unknown';
    
    const userAgent = event.headers['user-agent'] || 'unknown';

    // 添加CTO黑历史
    const result = await addCtoHistory({
      title: title.trim(),
      description: description.trim(),
      images: images || []
    });

    // 记录事件
    await logEvent('add_cto_history', {
      title: title.trim(),
      hasImages: images && images.length > 0,
      timestamp: new Date().toISOString()
    }, ip, userAgent);

    if (result.success) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'CTO黑历史添加成功',
          data: result.data
        })
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(result)
      };
    }

  } catch (error) {
    console.error('添加CTO黑历史失败:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: '服务器内部错误'
      })
    };
  }
}
