// prisma/seed.js
// Seed script for initial Role and Employee data
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
