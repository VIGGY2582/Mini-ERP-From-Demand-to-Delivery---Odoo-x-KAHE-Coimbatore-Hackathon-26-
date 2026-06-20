// prisma/seed.js
// Seed script for initial Role, Employee, Category, Product, and Inventory data
// Run with: npm run seed

import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js'; // singleton Prisma client

const SALT_ROUNDS = 10;

async function main() {
  // Upsert roles (idempotent)
  const rolesData = [
    { name: 'Admin', description: 'System Administrator' },
    { name: 'Manager', description: 'Department Manager' },
    { name: 'Sales', description: 'Sales Department' },
    { name: 'Inventory', description: 'Inventory Department' },
    { name: 'Production', description: 'Production Department' },
    { name: 'Purchase', description: 'Purchase Department' },
  ];

  for (const role of rolesData) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
        description: role.description,
      },
    });
  }

  // Get Admin role ID
  const adminRole = await prisma.role.findUnique({ where: { name: 'Admin' } });

  // Hash admin password
  const hashedPassword = await bcrypt.hash('Admin@123', SALT_ROUNDS);

  // Upsert admin employee
  await prisma.employee.upsert({
    where: { email: 'admin@erp.local' },
    update: {},
    create: {
      employeeCode: 'EMP001',
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@erp.local',
      passwordHash: hashedPassword,
      isActive: true,
      roleId: adminRole.id,
    },
  });

  // Seed categories
  const categoriesData = [
    { name: 'Electronics', description: 'Electronic devices and accessories' },
    { name: 'Apparel', description: 'Clothing and accessories' },
    { name: 'Office Supplies', description: 'Stationery and office equipment' },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name, description: cat.description },
    });
  }

  // Fetch category IDs for linking products
  const electronics = await prisma.category.findUnique({ where: { name: 'Electronics' } });
  const apparel = await prisma.category.findUnique({ where: { name: 'Apparel' } });

  // Seed products with inventory
  const productsData = [
    { name: 'Smartphone', sku: 'ELEC-001', price: 699.99, categoryId: electronics.id },
    { name: 'Laptop', sku: 'ELEC-002', price: 1299.0, categoryId: electronics.id },
    { name: 'T-Shirt', sku: 'APP-001', price: 19.99, categoryId: apparel.id },
  ];

  for (const prod of productsData) {
    const createdProduct = await prisma.product.upsert({
      where: { sku: prod.sku },
      update: {},
      create: {
        name: prod.name,
        sku: prod.sku,
        price: prod.price,
        categoryId: prod.categoryId,
      },
    });

    // Create inventory record for each product
    await prisma.inventory.upsert({
      where: { productId: createdProduct.id },
      update: {},
      create: {
        productId: createdProduct.id,
        quantity: 0,
      },
    });
  }

  console.log('✅ Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
