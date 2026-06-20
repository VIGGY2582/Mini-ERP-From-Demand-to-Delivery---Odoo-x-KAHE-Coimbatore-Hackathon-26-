import * as rolesService from '../services/rolesService.js';

export const getAllRoles = async (req, res, next) => {
  try {
    const result = await rolesService.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
