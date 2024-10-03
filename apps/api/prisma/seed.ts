/**
 * Adds seed users and rxs to db
 *
 * @see https://www.prisma.io/docs/guides/database/seed-database
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.rx.deleteMany();
  await prisma.medication.deleteMany();

  // Upsert users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {
      name: 'John Doe Updated', // Update details (if necessary)
      password: 'hashedpassword1', // You could also update the password, if needed
    },
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'hashedpassword1',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {
      name: 'Jane Smith Updated',
      password: 'hashedpassword2',
    },
    create: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'hashedpassword2',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'alex.jones@example.com' },
    update: {
      name: 'Alex Jones Updated',
      password: 'hashedpassword3',
    },
    create: {
      email: 'alex.jones@example.com',
      name: 'Alex Jones',
      password: 'hashedpassword3',
    },
  });

  // Create medications
  const medication1 = await prisma.medication.create({
    data: {
      name: 'Ibuprofen',
      details: 'Pain reliever and anti-inflammatory',
      warnings: 'May cause stomach upset, take with food',
      cost: 5.99,
    },
  });

  const medication2 = await prisma.medication.create({
    data: {
      name: 'Amoxicillin',
      details: 'Antibiotic for bacterial infections',
      warnings: 'Complete full course, even if symptoms improve',
      cost: 12.49,
    },
  });

  const medication3 = await prisma.medication.create({
    data: {
      name: 'Lisinopril',
      details: 'Used to treat high blood pressure',
      warnings: 'May cause dizziness, especially after first dose',
      cost: 8.99,
    },
  });

  // Create prescriptions (Rx)
  await prisma.rx.create({
    data: {
      user: { connect: { id: user1.id } },
      medication: { connect: { id: medication1.id } },
      dosage: '200mg twice a day',
      notes: 'Take after meals',
    },
  });

  await prisma.rx.create({
    data: {
      user: { connect: { id: user2.id } },
      medication: { connect: { id: medication2.id } },
      dosage: '500mg three times a day',
      notes: 'Complete full 7-day course',
    },
  });

  await prisma.rx.create({
    data: {
      user: { connect: { id: user3.id } },
      medication: { connect: { id: medication3.id } },
      dosage: '10mg once daily',
      notes: 'Take in the morning',
    },
  });

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


