import { addCompanyEvent, logEvent, initDatabase } from './utils/db.js';

// 生成验证码
function generateCaptcha() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 验证验证码
function validateCaptcha(userInput, correctAnswer) {
  return userInput.toUpperCase() === correctAnswer.toUpperCase();
}

export const handler = async (event, context) => {
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
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: `不支持${event.httpMethod}请求方法，只支持POST请求`,
          code: 'METHOD_NOT_ALLOWED',
          allowedMethods: ['POST']
        })
      };
    }

    const body = JSON.parse(event.body || '{}');
    const { title, description, severity, images, captcha, captchaAnswer } = body;

    // 验证必填字段
    if (!title || !description || !severity) {
      const missingFields = [];
      if (!title) missingFields.push('标题');
      if (!description) missingFields.push('描述');
      if (!severity) missingFields.push('严重程度');
      
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: `以下字段为必填项：${missingFields.join('、')}`,
          code: 'MISSING_REQUIRED_FIELDS',
          missingFields
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
        const img = images[i];
        if (typeof img !== 'string') {
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
        
        if (!img.startsWith('data:image/')) {
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
        const isSupported = supportedFormats.some(format => img.startsWith(format));
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
        
        // 检查base64图片大小（大约每MB约1.33倍）
        const base64Size = img.length * 0.75;
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (base64Size > maxSize) {
          const sizeMB = (base64Size / (1024 * 1024)).toFixed(2);
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

    // 验证严重程度
    const validSeverities = ['低', '中', '高', '极高'];
    if (!validSeverities.includes(severity)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: `严重程度必须是以下之一：${validSeverities.join('、')}`,
          code: 'INVALID_SEVERITY',
          validSeverities
        })
      };
    }

    // 验证验证码
    if (!captcha || !captchaAnswer) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: '验证码和验证码答案不能为空',
          code: 'CAPTCHA_REQUIRED'
        })
      };
    }
    
    if (!validateCaptcha(captcha, captchaAnswer)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: '验证码错误，请重新输入',
          code: 'CAPTCHA_INVALID'
        })
      };
    }

    // 获取客户端信息
    const ip = event.headers['client-ip'] || 
               event.headers['x-forwarded-for'] || 
               event.headers['x-real-ip'] || 
               'unknown';
    
    const userAgent = event.headers['user-agent'] || 'unknown';

    // 添加公司事件
    const result = await addCompanyEvent({
      title: title.trim(),
      description: description.trim(),
      severity,
      images: images || []
    });

    // 记录事件
    await logEvent('add_company_event', {
      title: title.trim(),
      severity,
      hasImages: images && images.length > 0,
      timestamp: new Date().toISOString()
    }, ip, userAgent);

    if (result.success) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: '事件添加成功',
          data: result.data
        })
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: result.error || '添加事件失败',
          code: 'DATABASE_ERROR'
        })
      };
    }

  } catch (error) {
    console.error('添加公司事件失败:', error);
    
    // 区分不同类型的错误
    let errorMessage = '服务器内部错误';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    
    if (error.name === 'SyntaxError') {
      errorMessage = '请求数据格式错误';
      errorCode = 'INVALID_JSON';
    } else if (error.message && error.message.includes('timeout')) {
      errorMessage = '请求超时，请稍后重试';
      errorCode = 'REQUEST_TIMEOUT';
    } else if (error.message && error.message.includes('network')) {
      errorMessage = '网络连接错误';
      errorCode = 'NETWORK_ERROR';
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: errorMessage,
        code: errorCode,
        timestamp: new Date().toISOString()
      })
    };
  }
}
