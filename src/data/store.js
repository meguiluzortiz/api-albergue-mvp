const { v4: uuidv4 } = require('uuid');

const pets = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Firulais',
    species: 'dog',
    sex: 'male',
    ageMonths: 24,
    status: 'available',
    sponsorshipMonthlyAmount: 30,
    photoUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Luna',
    species: 'cat',
    sex: 'female',
    ageMonths: 12,
    status: 'available',
    sponsorshipMonthlyAmount: 30,
    photoUrl: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Bruno',
    species: 'dog',
    sex: 'male',
    ageMonths: 18,
    status: 'available',
    sponsorshipMonthlyAmount: 35,
    photoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Mía',
    species: 'cat',
    sex: 'female',
    ageMonths: 10,
    status: 'available',
    sponsorshipMonthlyAmount: 25,
    photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Coco',
    species: 'dog',
    sex: 'male',
    ageMonths: 30,
    status: 'available',
    sponsorshipMonthlyAmount: 40,
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date().toISOString()
  }
];

const sponsorships = [
  {
    id: '33333333-3333-3333-3333-333333333333',
    petId: pets[0].id,
    donorName: 'Juan Perez',
    donorPhone: '51987654321',
    amount: 30,
    operationNumber: '0048291',
    receiptUrl: 'https://blob.example.com/receipts/3333.jpg',
    status: 'pending',
    reviewNote: null,
    reviewedAt: null,
    createdAt: new Date().toISOString()
  }
];

const preEvaluations = [
  {
    id: '44444444-4444-4444-4444-444444444444',
    petId: pets[0].id,
    applicantName: 'Maria Mori',
    applicantPhone: '51999111222',
    district: 'Comas',
    homeType: 'house',
    familyAgreement: true,
    economicStability: true,
    sterilizationCommitment: true,
    status: 'new',
    notes: 'Quiero adoptar con compromiso responsable.',
    createdAt: new Date().toISOString()
  }
];

const adminUsers = [
  {
    id: uuidv4(),
    name: 'Admin Principal',
    email: 'admin@albergue.pe',
    passwordHash: '$2a$10$cDV5AsinCXcPMwhPgRynkutCENp6rDVYXnc.dGuih2WeCsgbIlena',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

module.exports = {
  pets,
  sponsorships,
  preEvaluations,
  adminUsers
};
