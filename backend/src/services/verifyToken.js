// const jwt = require('jsonwebtoken');
// const jwkToPem = require('jwk-to-pem');
// const axios = require('axios');

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization;
  
//   if (!token) {
//     return res.status(403).send('Token is required');
//   }

//   try {
//     const decoded = jwt.decode(token, { complete: true });
//     const kid = decoded.header.kid;
    
//     // Fetch JWKS from Cognito
//     const jwksResponse = await axios.get(`https://cognito-idp.us-east-2.amazonaws.com/us-east-2_S5m359PMg/.well-known/jwks.json`);
//     const jwks = jwksResponse.data;
    
//     const jwk = jwks.keys.find(key => key.kid === kid);
//     if (!jwk) {
//       throw new Error('Invalid token');
//     }
    
//     const pem = jwkToPem(jwk);
//     const verifiedToken = jwt.verify(token, pem);
    
//     req.userId = verifiedToken.sub;  // Extract the user ID from the token
//     next();
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     return res.status(401).send('Unauthorized');
//   }
// };

// module.exports = verifyToken;
