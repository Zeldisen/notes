const jwt = require('jsonwebtoken');

const validateToken = {
  before: async (request) => {
    try {
      const headers = request.event.headers || {};
      const authHeader = headers.authorization || headers.Authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Missing token');
      }

      const token = authHeader.replace('Bearer ', '').trim();

      // hemlig nyckel
      const data = jwt.verify(token, process.env.JWT_SECRET);

      request.event.userId = data.userId 
      request.event.username = data.username;

      // middy fortsätter till riktiga handlern
    } catch (error) {
      console.error('validateToken error:', error);
      request.response = {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: 'Unauthorized' }),
      };
    }
  },

  //felhantering
  onError: async (request) => {
    if (!request.response) {
      request.response = {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: 'Unauthorized' }),
      };
    }
  },
};

module.exports = { validateToken };
