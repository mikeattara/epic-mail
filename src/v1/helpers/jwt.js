/* eslint-disable consistent-return */
import jwt from 'express-jwt';
import dotenv from 'dotenv';
import userService from '../users/user.service';

dotenv.config();

async function isRevoked(req, payload, done) {
  const user = await userService.getUserById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }
}

function auth() {
  const secret = process.env.JWT_KEY;
  return jwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/api/v1/users/login',
      '/api/v1/users/signup'
    ]
  });
}

export default auth;
