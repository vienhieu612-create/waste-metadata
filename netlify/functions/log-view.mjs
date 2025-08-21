import { logPageView, logEvent } from './utils/db.js';

export const handler = async (event, context) => {
  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // 处理预检请求
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
        body: JSON.stringify({ error: '只支持POST请求' })
      };
    }

    const body = JSON.parse(event.body || '{}');
    const { pageUrl, referrer } = body;

    // 获取客户端信息
    const ip = event.headers['client-ip'] || 
               event.headers['x-forwarded-for'] || 
               event.headers['x-real-ip'] || 
               'unknown';
    
    const userAgent = event.headers['user-agent'] || 'unknown';

    // 记录页面访问
    const viewResult = await logPageView({
      ip,
      userAgent,
      pageUrl: pageUrl || '/',
      referrer: referrer || ''
    });

    // 记录事件
    await logEvent('page_view', {
      pageUrl,
      referrer,
      timestamp: new Date().toISOString()
    }, ip, userAgent);

    if (viewResult.success) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: '访问记录成功'
        })
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: viewResult.error
        })
      };
    }

  } catch (error) {
    console.error('记录页面访问失败:', error);
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
