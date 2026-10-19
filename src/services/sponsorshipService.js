const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { sponsorships } = require('../data/store');
const { getPetById } = require('./petService');
const { uploadDir } = require('../config/env');

function createSponsorship(data) {
  getPetById(data.petId);

  const sponsorship = {
    id: uuidv4(),
    ...data,
    receiptUrl: null,
    status: 'pending',
    reviewNote: null,
    reviewedAt: null,
    createdAt: new Date().toISOString()
  };

  sponsorships.push(sponsorship);
  return sponsorship;
}

function uploadReceiptBySponsorship(sponsorshipId, file) {
  const sponsorship = sponsorships.find((item) => item.id === sponsorshipId);

  if (!sponsorship) {
    const error = new Error('Comprobante no encontrado');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  if (!file) {
    const error = new Error('Archivo de comprobante requerido');
    error.statusCode = 400;
    error.code = 'INVALID_REQUEST';
    throw error;
  }

  const fileName = `${sponsorshipId}-${Date.now()}-${file.originalname}`;
  const relativeDir = path.resolve(process.cwd(), uploadDir);
  fs.mkdirSync(relativeDir, { recursive: true });

  const filePath = path.join(relativeDir, fileName);
  fs.writeFileSync(filePath, file.buffer);

  const publicUrl = `/uploads/${fileName}`;
  sponsorship.receiptUrl = publicUrl;
  sponsorship.status = 'pending';

  return {
    sponsorshipId: sponsorship.id,
    receiptUrl: publicUrl,
    status: sponsorship.status
  };
}

function listSponsorships(status) {
  if (!status) return sponsorships;
  return sponsorships.filter((item) => item.status === status);
}

function getSponsorshipById(sponsorshipId) {
  const sponsorship = sponsorships.find((item) => item.id === sponsorshipId);

  if (!sponsorship) {
    const error = new Error('Padrinazgo no encontrado');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  return sponsorship;
}

function reviewSponsorship(sponsorshipId, action, note) {
  const sponsorship = getSponsorshipById(sponsorshipId);

  sponsorship.status = action === 'approve' ? 'approved' : 'rejected';
  sponsorship.reviewNote = note || null;
  sponsorship.reviewedAt = new Date().toISOString();

  return sponsorship;
}

module.exports = {
  createSponsorship,
  uploadReceiptBySponsorship,
  listSponsorships,
  getSponsorshipById,
  reviewSponsorship
};
