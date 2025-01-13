const jwt = require('jsonwebtoken');
  import { SignJWT } from 'jose';
export const getToken = async (user) => {
/* const payload = user;
const secret = process.env.JWT_SECRET;
const token = jwt.sign(payload, secret, { expiresIn: '1h' }); */
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
  
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' }) // Algorithm: HMAC with SHA-256
    .setIssuedAt()
    .setExpirationTime('2h') // Token expires in 2 hours
    .setNotBefore('0s')
    .sign(secretKey);

  return token;
 /*  console.log('Generated Token:', token);
  return token */
}

export const createResponse = ({ code = 200, status = true, message = "", data = null, error = null }) => {
  status = error? false:status
  return {
    code,
    status,
    message,
    data,
    error
  };
};

export const cordMiddleware = (middleware)=> {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
export const runMiddleware = (req,res , middlewares)=> {
  return middlewares.reduce((promise, middleware) => {
    return promise.then(() => new Promise((resolve, reject) => {
      try{
        middleware(req,res,(result) => {
          if (result instanceof Error || req.method === 'OPTIONS') {
            return reject(result);
          }
          return resolve(result);
        });
      }catch(error){
        return reject(error);
      }
    }));
  }, Promise.resolve());
}