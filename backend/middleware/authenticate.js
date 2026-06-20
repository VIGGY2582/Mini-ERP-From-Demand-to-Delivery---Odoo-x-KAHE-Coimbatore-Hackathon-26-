import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/authRepository.js';

/**
 * Authentication middleware to verify JWT token.
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      const error = new Error('Authentication required');
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authRepository.findById(decoded.id);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      return next(error);
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role.name,
    };

    next();
  } catch (error) {
    const authError = new Error('Invalid or expired token');
    authError.statusCode = 401;
    next(authError);
  }
};
