  const jwt = require('jsonwebtoken');
export const getToken = (user) => {
const payload = user || { userId: 123, email: 'user@example.com', role: 'user' };
const secret = process.env.JWT_SECRET || 'your-secret-key';
const token = jwt.sign(payload, secret, { expiresIn: '1h' });
console.log('Generated Token:', token);
}