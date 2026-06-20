import * as authService from '../services/authService.js';

export const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const result = await authService.logoutUser();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const result = await authService.getCurrentUser();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
