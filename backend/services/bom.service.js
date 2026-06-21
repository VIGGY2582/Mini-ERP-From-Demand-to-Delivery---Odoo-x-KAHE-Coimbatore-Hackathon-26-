import * as bomRepository from '../repositories/bom.repository.js';
import * as productRepository from '../repositories/product.repository.js';

/**
 * Create a new BoM with validation.
 */
export const createBoM = async (data) => {
  const { productId, lines } = data;

  // Validate finished product exists
  const product = await productRepository.getProductById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  // Validate finished product is of type FINISHED_GOOD
  if (product.type !== 'FINISHED_GOOD') {
    const error = new Error('Only finished products can have a Bill of Materials');
    error.statusCode = 400;
    throw error;
  }

  // Check if an active BoM already exists for this product
  const existingActiveBoM = await bomRepository.getActiveBoMByProductId(productId);
  if (existingActiveBoM) {
    const error = new Error('An active BoM already exists for this product');
    error.statusCode = 409;
    throw error;
  }

  // Validate lines
  if (!lines || lines.length === 0) {
    const error = new Error('At least one component is required');
    error.statusCode = 400;
    throw error;
  }

  const componentIds = new Set();

  for (const line of lines) {
    const { componentProductId, quantity } = line;

    // Validate component product exists
    const componentProduct = await productRepository.getProductById(componentProductId);
    if (!componentProduct) {
      const error = new Error(`Component product with ID ${componentProductId} not found`);
      error.statusCode = 404;
      throw error;
    }

    // Validate component quantity
    if (!quantity || quantity <= 0) {
      const error = new Error('Component quantity must be greater than zero');
      error.statusCode = 400;
      throw error;
    }

    // Validate component is not the finished product itself
    if (componentProductId === productId) {
      const error = new Error('A product cannot be a component of itself');
      error.statusCode = 400;
      throw error;
    }

    // Check for duplicate components
    if (componentIds.has(componentProductId)) {
      const error = new Error('Duplicate component products are not allowed in the same BoM');
      error.statusCode = 400;
      throw error;
    }
    componentIds.add(componentProductId);
  }

  // Create BoM
  const bom = await bomRepository.createBoM({
    productId: Number(productId),
    version: data.version || '1.0',
    isActive: true,
  });

  // Create BoM lines
  const bomLines = lines.map((line) => ({
    bomId: bom.id,
    componentProductId: Number(line.componentProductId),
    quantity: Number(line.quantity),
  }));

  await bomRepository.createBoMLines(bomLines);

  // Fetch complete BoM with lines
  const completeBoM = await bomRepository.getBoMById(bom.id);

  return {
    success: true,
    message: 'Bill of Materials created successfully',
    data: completeBoM,
  };
};

/**
 * Get all BoMs.
 */
export const getAllBoMs = async () => {
  const boms = await bomRepository.getAllBoMs();
  return {
    success: true,
    message: 'Bill of Materials retrieved successfully',
    data: boms,
  };
};

/**
 * Get BoM by ID.
 */
export const getBoMById = async (id) => {
  const bom = await bomRepository.getBoMById(id);
  if (!bom) {
    const error = new Error('Bill of Materials not found');
    error.statusCode = 404;
    throw error;
  }
  return {
    success: true,
    message: 'Bill of Materials retrieved successfully',
    data: bom,
  };
};

/**
 * Update BoM.
 */
export const updateBoM = async (id, data) => {
  const { productId, lines, version, isActive } = data;

  // Check if BoM exists
  const existingBoM = await bomRepository.getBoMById(id);
  if (!existingBoM) {
    const error = new Error('Bill of Materials not found');
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};

  if (productId !== undefined) {
    // Validate finished product exists
    const product = await productRepository.getProductById(productId);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    // Validate finished product is of type FINISHED_GOOD
    if (product.type !== 'FINISHED_GOOD') {
      const error = new Error('Only finished products can have a Bill of Materials');
      error.statusCode = 400;
      throw error;
    }

    // Check if an active BoM already exists for this product (if activating)
    if (isActive !== undefined && isActive) {
      const existingActiveBoM = await bomRepository.getActiveBoMByProductId(productId);
      if (existingActiveBoM && existingActiveBoM.id !== id) {
        const error = new Error('An active BoM already exists for this product');
        error.statusCode = 409;
        throw error;
      }
    }

    updateData.productId = Number(productId);
  }

  if (version !== undefined) {
    updateData.version = version;
  }

  if (isActive !== undefined) {
    updateData.isActive = isActive;
  }

  // Update BoM
  const updatedBoM = await bomRepository.updateBoM(id, updateData);

  // If lines are provided, update them
  if (lines && lines.length > 0) {
    // Delete existing lines
    await bomRepository.deleteBoMLinesByBomId(id);

    // Validate and create new lines
    const componentIds = new Set();
    const bomLines = [];

    for (const line of lines) {
      const { componentProductId, quantity } = line;

      // Validate component product exists
      const componentProduct = await productRepository.getProductById(componentProductId);
      if (!componentProduct) {
        const error = new Error(`Component product with ID ${componentProductId} not found`);
        error.statusCode = 404;
        throw error;
      }

      // Validate component quantity
      if (!quantity || quantity <= 0) {
        const error = new Error('Component quantity must be greater than zero');
        error.statusCode = 400;
        throw error;
      }

      // Validate component is not the finished product itself
      const finalProductId = productId !== undefined ? productId : existingBoM.productId;
      if (componentProductId === finalProductId) {
        const error = new Error('A product cannot be a component of itself');
        error.statusCode = 400;
        throw error;
      }

      // Check for duplicate components
      if (componentIds.has(componentProductId)) {
        const error = new Error('Duplicate component products are not allowed in the same BoM');
        error.statusCode = 400;
        throw error;
      }
      componentIds.add(componentProductId);

      bomLines.push({
        bomId: id,
        componentProductId: Number(componentProductId),
        quantity: Number(quantity),
      });
    }

    await bomRepository.createBoMLines(bomLines);
  }

  // Fetch complete updated BoM
  const completeBoM = await bomRepository.getBoMById(id);

  return {
    success: true,
    message: 'Bill of Materials updated successfully',
    data: completeBoM,
  };
};

/**
 * Delete BoM (soft delete).
 */
export const deleteBoM = async (id) => {
  // Check if BoM exists
  const existingBoM = await bomRepository.getBoMById(id);
  if (!existingBoM) {
    const error = new Error('Bill of Materials not found');
    error.statusCode = 404;
    throw error;
  }

  await bomRepository.deleteBoM(id);

  return {
    success: true,
    message: 'Bill of Materials deleted successfully',
  };
};
