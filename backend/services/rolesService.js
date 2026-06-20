import * as rolesRepository from '../repositories/rolesRepository.js';

export const getAll = async () => {
  return rolesRepository.getPlaceholderResponse();
};
