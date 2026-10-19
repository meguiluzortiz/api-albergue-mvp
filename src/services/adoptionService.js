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

function generateWhatsAppLink(preEvaluationId) {
  const preEvaluation = preEvaluations.find((item) => item.id === preEvaluationId);

  if (!preEvaluation) {
    const error = new Error('Evaluación no encontrada');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  const pet = getPetById(preEvaluation.petId);
  const text = encodeURIComponent(`Hola, quiero adoptar a ${pet.name}`);
  const whatsappUrl = `https://wa.me/51912345678?text=${text}`;

  return {
    preEvaluationId: preEvaluation.id,
    whatsappUrl
  };
}

module.exports = { createPreEvaluation, generateWhatsAppLink };
