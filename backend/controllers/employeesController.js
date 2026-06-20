import * as employeesService from '../services/employeesService.js';

export const getAllEmployees = async (req, res, next) => {
  try {
    const result = await employeesService.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const result = await employeesService.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const result = await employeesService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const result = await employeesService.remove(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
