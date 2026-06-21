import bomService from '../services/bom.service.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create BoM
export const createBoM = asyncHandler(async (req, res) => {
  const result = await bomService.createBoM(req.body);
  res.status(201).json(result);
});

// Get all BoMs
export const getAllBoMs = asyncHandler(async (req, res) => {
  const result = await bomService.getAllBoMs();
  res.json(result);
});

// Get BoM by ID
export const getBoMById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await bomService.getBoMById(parseInt(id, 10));
  res.json(result);
});

// Update BoM
export const updateBoM = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await bomService.updateBoM(parseInt(id, 10), req.body);
  res.json(result);
});

// Delete BoM
export const deleteBoM = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await bomService.deleteBoM(parseInt(id, 10));
  res.json(result);
});
