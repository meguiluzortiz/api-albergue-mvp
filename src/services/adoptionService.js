const { v4: uuidv4 } = require('uuid');
const { preEvaluations } = require('../data/store');
const { getPetById } = require('./petService');

function createPreEvaluation(data) {
  getPetById(data.petId);

  const preEvaluation = {
    id: uuidv4(),
    ...data,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  preEvaluations.push(preEvaluation);
  return preEvaluation;
}

function listPreEvaluations(status) {
  if (!status) return preEvaluations;
  return preEvaluations.filter((item) => item.status === status);
}

function getPreEvaluationById(preEvaluationId) {
  const preEvaluation = preEvaluations.find((item) => item.id === preEvaluationId);

  if (!preEvaluation) {
    const error = new Error('Evaluación no encontrada');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  return preEvaluation;
}

function reviewPreEvaluation(preEvaluationId, action, note) {
  const preEvaluation = getPreEvaluationById(preEvaluationId);

  preEvaluation.status = action === 'approve' ? 'approved' : 'rejected';
  preEvaluation.reviewNote = note || null;
  preEvaluation.reviewedAt = new Date().toISOString();

  return preEvaluation;
}

function generateWhatsAppLink(preEvaluationId) {
  const preEvaluation = getPreEvaluationById(preEvaluationId);

  const pet = getPetById(preEvaluation.petId);
  const text = encodeURIComponent(`Hola, quiero adoptar a ${pet.name}`);
  const whatsappUrl = `https://wa.me/51912345678?text=${text}`;

  return {
    preEvaluationId: preEvaluation.id,
    whatsappUrl,
    whatsappLink: whatsappUrl,
    link: whatsappUrl
  };
}

module.exports = {
  createPreEvaluation,
  listPreEvaluations,
  getPreEvaluationById,
  reviewPreEvaluation,
  generateWhatsAppLink
};
