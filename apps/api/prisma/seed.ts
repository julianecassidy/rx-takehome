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
      password: 'password', // You could also update the password, if needed
    },
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {
      name: 'Jane Smith Updated',
      password: 'password',
    },
    create: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'password',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'alex.jones@example.com' },
    update: {
      name: 'Alex Jones Updated',
      password: 'password',
    },
    create: {
      email: 'alex.jones@example.com',
      name: 'Alex Jones',
      password: 'password',
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {
      name: 'Test Updated',
      password: 'password',
    },
    create: {
      email: 'test@test.com',
      name: 'Test',
      password: 'password',
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

  const medication4 = await prisma.medication.create({
    data: {
      name: 'Metformin',
      details: 'Helps control blood sugar levels in type 2 diabetes',
      warnings: 'May cause gastrointestinal upset, take with food',
      cost: 6.49,
    },
  });

  const medication5 = await prisma.medication.create({
    data: {
      name: 'Atorvastatin',
      details: 'Used to lower cholesterol and reduce the risk of heart disease',
      warnings: 'May cause muscle pain, contact doctor if severe',
      cost: 15.99,
    },
  });

  const medication6 = await prisma.medication.create({
    data: {
      name: 'Omeprazole',
      details: 'Reduces stomach acid, used for GERD and ulcers',
      warnings: 'Long-term use may lead to vitamin deficiencies, consult doctor',
      cost: 8.49,
    },
  });

  const medication7 = await prisma.medication.create({
    data: {
      name: 'Levothyroxine',
      details: 'Used to treat hypothyroidism (underactive thyroid)',
      warnings: 'Take on an empty stomach, avoid taking close to calcium supplements',
      cost: 4.99,
    },
  });

  const medication8 = await prisma.medication.create({
    data: {
      name: 'Amlodipine',
      details: 'Calcium channel blocker used to treat high blood pressure and angina',
      warnings: 'May cause swelling in the ankles or feet, contact doctor if bothersome',
      cost: 7.99,
    },
  });

  const medication9 = await prisma.medication.create({
    data: {
      name: 'Sertraline',
      details: 'Used to treat depression, anxiety, and other mood disorders',
      warnings: 'May cause drowsiness or dizziness, avoid alcohol while taking',
      cost: 14.99,
    },
  });

  const medication10 = await prisma.medication.create({
    data: {
      name: 'Cetirizine',
      details: 'Antihistamine used for allergy relief',
      warnings: 'May cause drowsiness, use caution when operating machinery',
      cost: 3.49,
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


