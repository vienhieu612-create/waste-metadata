import { getComments } from './utils/db.js';

export default async function handler(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return new Response('', { status: 200, headers });
  }

  try {
    if (event.httpMethod !== 'GET') {
      return new Response(JSON.stringify({ error: '只支持GET请求' }), {
        status: 405,
        headers
      });
    }

    const { page = 1, limit = 10 } = event.queryStringParameters || {};
    const result = await getComments(parseInt(page), parseInt(limit));

    if (result.success) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers
      });
    } else {
      return new Response(JSON.stringify(result), {
        status: 500,
        headers
      });
    }

  } catch (error) {
    console.error('获取评论失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: '服务器内部错误'
    }), {
      status: 500,
      headers
    });
  }
}
