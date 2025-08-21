import { addComment, logEvent } from './utils/db.js';

// 验证验证码
function validateCaptcha(userInput, correctAnswer) {
  return userInput.toUpperCase() === correctAnswer.toUpperCase();
}

export default async function handler(event, context) {
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
    const { author, content, captcha, captchaAnswer } = body;

    // 验证必填字段
    if (!author || !content) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: '姓名和评论内容为必填项'
        })
      };
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

    // 添加评论
    const result = await addComment({
      author: author.trim(),
      content: content.trim(),
      ip,
      userAgent
    });

    // 记录事件
    await logEvent('add_comment', {
      author: author.trim(),
      contentLength: content.trim().length,
      timestamp: new Date().toISOString()
    }, ip, userAgent);

    if (result.success) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: '评论发表成功',
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
    console.error('添加评论失败:', error);
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
