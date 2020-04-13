import jwt from 'jsonwebtoken';

export async function createToken(params) {
  return await jwt.sign(params, process.env.TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}
