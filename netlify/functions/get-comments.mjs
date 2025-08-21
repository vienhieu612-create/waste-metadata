import { getComments } from './utils/db.js';

export default async function handler(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: '只支持GET请求' })
      };
    }

    const { page = 1, limit = 10 } = event.queryStringParameters || {};
    const result = await getComments(parseInt(page), parseInt(limit));

    if (result.success) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(result)
      };
    }

  } catch (error) {
    console.error('获取评论失败:', error);
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
