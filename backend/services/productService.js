import * as productRepository from '../repositories/product.repository.js';
import * as categoryRepository from '../repositories/category.repository.js';
import * as vendorRepository from '../repositories/vendor.repository.js';

/**
 * Create a new product with validation.
 */
export const createProduct = async (data) => {
  const {
    name,
    sku,
    description,
    categoryId,
    vendorId,
    type,
    unit,
    sellingPrice,
    purchasePrice,
    minimumStock,
  } = data;

  // Trim whitespace
  const trimmedName = name.trim();
  const trimmedSku = sku.trim();
  const trimmedDescription = description ? description.trim() : null;
  const trimmedUnit = unit ? unit.trim() : null;

  // Validation
  if (!trimmedSku) {
    const error = new Error('SKU is required');
    error.statusCode = 400;
    throw error;
  }

  if (!trimmedName) {
    const error = new Error('Product name is required');
    error.statusCode = 400;
    throw error;
  }

  if (!categoryId) {
    const error = new Error('Category ID is required');
    error.statusCode = 400;
    throw error;
  }

  if (!vendorId) {
    const error = new Error('Vendor ID is required');
    error.statusCode = 400;
    throw error;
  }

  if (!type) {
    const error = new Error('Product type is required');
    error.statusCode = 400;
    throw error;
  }

  if (type !== 'RAW_MATERIAL' && type !== 'FINISHED_GOOD') {
    const error = new Error('Product type must be either RAW_MATERIAL or FINISHED_GOOD');
    error.statusCode = 400;
    throw error;
  }

  if (sellingPrice === undefined || sellingPrice === null) {
    const error = new Error('Selling price is required');
    error.statusCode = 400;
    throw error;
  }

  if (sellingPrice < 0) {
    const error = new Error('Selling price must be greater than or equal to 0');
    error.statusCode = 400;
    throw error;
  }

  if (purchasePrice === undefined || purchasePrice === null) {
    const error = new Error('Purchase price is required');
    error.statusCode = 400;
    throw error;
  }

  if (purchasePrice < 0) {
    const error = new Error('Purchase price must be greater than or equal to 0');
    error.statusCode = 400;
    throw error;
  }

  if (minimumStock !== undefined && minimumStock !== null && minimumStock < 0) {
    const error = new Error('Minimum stock must be greater than or equal to 0');
    error.statusCode = 400;
    throw error;
  }

  // Check for duplicate SKU
  const existingProductBySku = await productRepository.getProductBySku(trimmedSku);
  if (existingProductBySku) {
    const error = new Error('Product SKU already exists');
    error.statusCode = 409;
    throw error;
  }

  // Verify category exists
  const category = await categoryRepository.getCategoryById(categoryId);
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }

  // Verify vendor exists
  const vendor = await vendorRepository.getVendorById(vendorId);
  if (!vendor) {
    const error = new Error('Vendor not found');
    error.statusCode = 404;
    throw error;
  }

  const product = await productRepository.createProduct({
    name: trimmedName,
    sku: trimmedSku,
    description: trimmedDescription,
    categoryId: Number(categoryId),
    vendorId: Number(vendorId),
    type,
    unit: trimmedUnit,
    sellingPrice: Number(sellingPrice),
    purchasePrice: Number(purchasePrice),
    minimumStock: minimumStock !== undefined && minimumStock !== null ? Number(minimumStock) : 0,
  });

  return {
    success: true,
    message: 'Product created successfully',
    data: product,
  };
};

/**
 * Get all products.
 */
export const getProducts = async () => {
  const products = await productRepository.getProducts();
  return {
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  };
};

/**
 * Get product by ID.
 */
export const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return {
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  };
};

/**
 * Update product with validation.
 */
export const updateProduct = async (id, data) => {
  const {
    name,
    sku,
    description,
    categoryId,
    vendorId,
    type,
    unit,
    sellingPrice,
    purchasePrice,
    minimumStock,
  } = data;

  // Check if product exists
  const existingProduct = await productRepository.getProductById(id);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};

  // Trim and validate fields if provided
  if (name !== undefined) {
    const trimmedName = name.trim();
    if (!trimmedName) {
      const error = new Error('Product name is required');
      error.statusCode = 400;
      throw error;
    }
    updateData.name = trimmedName;
  }

  if (sku !== undefined) {
    const trimmedSku = sku.trim();
    if (!trimmedSku) {
      const error = new Error('SKU is required');
      error.statusCode = 400;
      throw error;
    }
    // Check for duplicate SKU
    if (trimmedSku !== existingProduct.sku) {
      const duplicateProduct = await productRepository.getProductBySku(trimmedSku);
      if (duplicateProduct) {
        const error = new Error('Product SKU already exists');
        error.statusCode = 409;
        throw error;
      }
    }
    updateData.sku = trimmedSku;
  }

  if (description !== undefined) {
    updateData.description = description ? description.trim() : null;
  }

  if (categoryId !== undefined) {
    if (!categoryId) {
      const error = new Error('Category ID is required');
      error.statusCode = 400;
      throw error;
    }
    // Verify category exists
    const category = await categoryRepository.getCategoryById(categoryId);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    updateData.categoryId = Number(categoryId);
  }

  if (vendorId !== undefined) {
    if (!vendorId) {
      const error = new Error('Vendor ID is required');
      error.statusCode = 400;
      throw error;
    }
    // Verify vendor exists
    const vendor = await vendorRepository.getVendorById(vendorId);
    if (!vendor) {
      const error = new Error('Vendor not found');
      error.statusCode = 404;
      throw error;
    }
    updateData.vendorId = Number(vendorId);
  }

  if (type !== undefined) {
    if (!type) {
      const error = new Error('Product type is required');
      error.statusCode = 400;
      throw error;
    }
    if (type !== 'RAW_MATERIAL' && type !== 'FINISHED_GOOD') {
      const error = new Error('Product type must be either RAW_MATERIAL or FINISHED_GOOD');
      error.statusCode = 400;
      throw error;
    }
    updateData.type = type;
  }

  if (unit !== undefined) {
    updateData.unit = unit ? unit.trim() : null;
  }

  if (sellingPrice !== undefined) {
    if (sellingPrice === null || sellingPrice === undefined) {
      const error = new Error('Selling price is required');
      error.statusCode = 400;
      throw error;
    }
    if (sellingPrice < 0) {
      const error = new Error('Selling price must be greater than or equal to 0');
      error.statusCode = 400;
      throw error;
    }
    updateData.sellingPrice = Number(sellingPrice);
  }

  if (purchasePrice !== undefined) {
    if (purchasePrice === null || purchasePrice === undefined) {
      const error = new Error('Purchase price is required');
      error.statusCode = 400;
      throw error;
    }
    if (purchasePrice < 0) {
      const error = new Error('Purchase price must be greater than or equal to 0');
      error.statusCode = 400;
      throw error;
    }
    updateData.purchasePrice = Number(purchasePrice);
  }

  if (minimumStock !== undefined) {
    if (minimumStock < 0) {
      const error = new Error('Minimum stock must be greater than or equal to 0');
      error.statusCode = 400;
      throw error;
    }
    updateData.minimumStock = Number(minimumStock);
  }

  const updatedProduct = await productRepository.updateProduct(id, updateData);

  return {
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  };
};

/**
 * Delete product (soft delete).
 */
export const deleteProduct = async (id) => {
  // Check if product exists
  const existingProduct = await productRepository.getProductById(id);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  await productRepository.deleteProduct(id);

  return {
    success: true,
    message: 'Product deleted successfully',
  };
};
