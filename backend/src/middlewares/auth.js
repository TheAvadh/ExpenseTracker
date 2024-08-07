// // middlewares/auth.js

// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

// const client = jwksClient({
//   jwksUri: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_S5m359PMg/.well-known/jwks.json'
// });

// function getKey(header, callback) {
//   client.getSigningKey(header.kid, (err, key) => {
//     if (err) {
//       return callback(err);
//     }
//     const signingKey = key.getPublicKey();
//     callback(null, signingKey);
//   });
// }

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

//   // Log the token for verification
//   console.log('Received Token:', token);

//   if (!token) {
//     console.log('No token received')
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, getKey, {
//     audience: '77h9pn9k4s8af80icfc8f6eqvu',
//     issuer: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_S5m359PMg",
//     algorithms: ['RS256'],
//   }, (err, decoded) => {
//     if (err) {
//       console.log('Decoded Token Payload:', decoded);
//       console.error('Token Verification Error accured:', err);
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     console.log('Decoded Token Payload:', decoded);

//     req.user = decoded;
//     next();
//   });
// };

// module.exports = verifyToken;