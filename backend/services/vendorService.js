import * as vendorRepository from '../repositories/vendor.repository.js';

/**
 * Create a new vendor with validation.
 */
export const createVendor = async (data) => {
  const {
    vendorCode,
    name,
    contactPerson,
    email,
    phone,
    address,
    city,
    state,
    country,
    postalCode,
  } = data;

  // Trim whitespace
  const trimmedVendorCode = vendorCode.trim();
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedContactPerson = contactPerson ? contactPerson.trim() : null;
  const trimmedPhone = phone ? phone.trim() : null;
  const trimmedAddress = address ? address.trim() : null;
  const trimmedCity = city ? city.trim() : null;
  const trimmedState = state ? state.trim() : null;
  const trimmedCountry = country ? country.trim() : null;
  const trimmedPostalCode = postalCode ? postalCode.trim() : null;

  // Validation
  if (!trimmedVendorCode) {
    const error = new Error('Vendor code is required');
    error.statusCode = 400;
    throw error;
  }

  if (!trimmedName) {
    const error = new Error('Vendor name is required');
    error.statusCode = 400;
    throw error;
  }

  if (!trimmedEmail) {
    const error = new Error('Vendor email is required');
    error.statusCode = 400;
    throw error;
  }

  // Check for duplicate vendor code
  const existingVendorByCode = await vendorRepository.getVendorByCode(trimmedVendorCode);
  if (existingVendorByCode) {
    const error = new Error('Vendor with this code already exists');
    error.statusCode = 409;
    throw error;
  }

  // Check for duplicate email
  const existingVendorByEmail = await vendorRepository.getVendorByEmail(trimmedEmail);
  if (existingVendorByEmail) {
    const error = new Error('Vendor with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  const vendor = await vendorRepository.createVendor({
    vendorCode: trimmedVendorCode,
    name: trimmedName,
    contactPerson: trimmedContactPerson,
    email: trimmedEmail,
    phone: trimmedPhone,
    address: trimmedAddress,
    city: trimmedCity,
    state: trimmedState,
    country: trimmedCountry,
    postalCode: trimmedPostalCode,
  });

  return {
    success: true,
    message: 'Vendor created successfully',
    data: vendor,
  };
};

/**
 * Get all vendors.
 */
export const getAllVendors = async () => {
  const vendors = await vendorRepository.getAllVendors();
  return {
    success: true,
    message: 'Vendors retrieved successfully',
    data: vendors,
  };
};

/**
 * Get vendor by ID.
 */
export const getVendorById = async (id) => {
  const vendor = await vendorRepository.getVendorById(id);
  if (!vendor) {
    const error = new Error('Vendor not found');
    error.statusCode = 404;
    throw error;
  }
  return {
    success: true,
    message: 'Vendor retrieved successfully',
    data: vendor,
  };
};

/**
 * Update vendor with validation.
 */
export const updateVendor = async (id, data) => {
  const {
    vendorCode,
    name,
    contactPerson,
    email,
    phone,
    address,
    city,
    state,
    country,
    postalCode,
  } = data;

  // Check if vendor exists
  const existingVendor = await vendorRepository.getVendorById(id);
  if (!existingVendor) {
    const error = new Error('Vendor not found');
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};

  // Trim and validate fields if provided
  if (vendorCode !== undefined) {
    const trimmedVendorCode = vendorCode.trim();
    if (!trimmedVendorCode) {
      const error = new Error('Vendor code is required');
      error.statusCode = 400;
      throw error;
    }
    // Check for duplicate vendor code
    if (trimmedVendorCode !== existingVendor.vendorCode) {
      const duplicateVendor = await vendorRepository.getVendorByCode(trimmedVendorCode);
      if (duplicateVendor) {
        const error = new Error('Vendor with this code already exists');
        error.statusCode = 409;
        throw error;
      }
    }
    updateData.vendorCode = trimmedVendorCode;
  }

  if (name !== undefined) {
    const trimmedName = name.trim();
    if (!trimmedName) {
      const error = new Error('Vendor name is required');
      error.statusCode = 400;
      throw error;
    }
    updateData.name = trimmedName;
  }

  if (email !== undefined) {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      const error = new Error('Vendor email is required');
      error.statusCode = 400;
      throw error;
    }
    // Check for duplicate email
    if (trimmedEmail !== existingVendor.email) {
      const duplicateVendor = await vendorRepository.getVendorByEmail(trimmedEmail);
      if (duplicateVendor) {
        const error = new Error('Vendor with this email already exists');
        error.statusCode = 409;
        throw error;
      }
    }
    updateData.email = trimmedEmail;
  }

  if (contactPerson !== undefined) {
    updateData.contactPerson = contactPerson ? contactPerson.trim() : null;
  }

  if (phone !== undefined) {
    updateData.phone = phone ? phone.trim() : null;
  }

  if (address !== undefined) {
    updateData.address = address ? address.trim() : null;
  }

  if (city !== undefined) {
    updateData.city = city ? city.trim() : null;
  }

  if (state !== undefined) {
    updateData.state = state ? state.trim() : null;
  }

  if (country !== undefined) {
    updateData.country = country ? country.trim() : null;
  }

  if (postalCode !== undefined) {
    updateData.postalCode = postalCode ? postalCode.trim() : null;
  }

  const updatedVendor = await vendorRepository.updateVendor(id, updateData);

  return {
    success: true,
    message: 'Vendor updated successfully',
    data: updatedVendor,
  };
};

/**
 * Delete vendor (soft delete).
 */
export const deleteVendor = async (id) => {
  // Check if vendor exists
  const existingVendor = await vendorRepository.getVendorById(id);
  if (!existingVendor) {
    const error = new Error('Vendor not found');
    error.statusCode = 404;
    throw error;
  }

  await vendorRepository.deleteVendor(id);

  return {
    success: true,
    message: 'Vendor deleted successfully',
  };
};
