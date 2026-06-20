import * as customerRepository from '../repositories/customer.repository.js';

/**
 * Create a new customer with validation.
 */
export const createCustomer = async (data) => {
  const {
    customerCode,
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
  const trimmedCustomerCode = customerCode.trim();
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
  if (!trimmedCustomerCode) {
    const error = new Error('Customer code is required');
    error.statusCode = 400;
    throw error;
  }

  if (!trimmedName) {
    const error = new Error('Customer name is required');
    error.statusCode = 400;
    throw error;
  }

  if (!trimmedEmail) {
    const error = new Error('Customer email is required');
    error.statusCode = 400;
    throw error;
  }

  // Check for duplicate customer code
  const existingCustomerByCode = await customerRepository.getCustomerByCode(trimmedCustomerCode);
  if (existingCustomerByCode) {
    const error = new Error('Customer with this code already exists');
    error.statusCode = 409;
    throw error;
  }

  // Check for duplicate email
  const existingCustomerByEmail = await customerRepository.getCustomerByEmail(trimmedEmail);
  if (existingCustomerByEmail) {
    const error = new Error('Customer with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  const customer = await customerRepository.createCustomer({
    customerCode: trimmedCustomerCode,
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
    message: 'Customer created successfully',
    data: customer,
  };
};

/**
 * Get all customers.
 */
export const getAllCustomers = async () => {
  const customers = await customerRepository.getAllCustomers();
  return {
    success: true,
    message: 'Customers retrieved successfully',
    data: customers,
  };
};

/**
 * Get customer by ID.
 */
export const getCustomerById = async (id) => {
  const customer = await customerRepository.getCustomerById(id);
  if (!customer) {
    const error = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }
  return {
    success: true,
    message: 'Customer retrieved successfully',
    data: customer,
  };
};

/**
 * Update customer with validation.
 */
export const updateCustomer = async (id, data) => {
  const {
    customerCode,
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

  // Check if customer exists
  const existingCustomer = await customerRepository.getCustomerById(id);
  if (!existingCustomer) {
    const error = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};

  // Trim and validate fields if provided
  if (customerCode !== undefined) {
    const trimmedCustomerCode = customerCode.trim();
    if (!trimmedCustomerCode) {
      const error = new Error('Customer code is required');
      error.statusCode = 400;
      throw error;
    }
    // Check for duplicate customer code
    if (trimmedCustomerCode !== existingCustomer.customerCode) {
      const duplicateCustomer = await customerRepository.getCustomerByCode(trimmedCustomerCode);
      if (duplicateCustomer) {
        const error = new Error('Customer with this code already exists');
        error.statusCode = 409;
        throw error;
      }
    }
    updateData.customerCode = trimmedCustomerCode;
  }

  if (name !== undefined) {
    const trimmedName = name.trim();
    if (!trimmedName) {
      const error = new Error('Customer name is required');
      error.statusCode = 400;
      throw error;
    }
    updateData.name = trimmedName;
  }

  if (email !== undefined) {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      const error = new Error('Customer email is required');
      error.statusCode = 400;
      throw error;
    }
    // Check for duplicate email
    if (trimmedEmail !== existingCustomer.email) {
      const duplicateCustomer = await customerRepository.getCustomerByEmail(trimmedEmail);
      if (duplicateCustomer) {
        const error = new Error('Customer with this email already exists');
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

  const updatedCustomer = await customerRepository.updateCustomer(id, updateData);

  return {
    success: true,
    message: 'Customer updated successfully',
    data: updatedCustomer,
  };
};

/**
 * Delete customer (soft delete).
 */
export const deleteCustomer = async (id) => {
  // Check if customer exists
  const existingCustomer = await customerRepository.getCustomerById(id);
  if (!existingCustomer) {
    const error = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }

  await customerRepository.deleteCustomer(id);

  return {
    success: true,
    message: 'Customer deleted successfully',
  };
};
