const { listPets, getPetById } = require('../services/petService');
const {
  createSponsorship,
  uploadReceiptBySponsorship
} = require('../services/sponsorshipService');
const {
  createPreEvaluation,
  generateWhatsAppLink
} = require('../services/adoptionService');

function listPetsController(req, res, next) {
  try {
    const { species, status, page, limit } = req.query;
    const result = listPets({ species, status, page, limit });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

function getPetByIdController(req, res, next) {
  try {
    const pet = getPetById(req.params.petId);
    return res.status(200).json(pet);
  } catch (error) {
    return next(error);
  }
}

function createSponsorshipController(req, res, next) {
  try {
    const sponsorship = createSponsorship(req.body);
    return res.status(201).json(sponsorship);
  } catch (error) {
    return next(error);
  }
}

function uploadReceiptController(req, res, next) {
  try {
    const result = uploadReceiptBySponsorship(req.params.sponsorshipId, req.file);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

function createPreEvaluationController(req, res, next) {
  try {
    const result = createPreEvaluation(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

function getWhatsAppLinkController(req, res, next) {
  try {
    const result = generateWhatsAppLink(req.params.preEvaluationId);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listPets: listPetsController,
  getPetById: getPetByIdController,
  createSponsorship: createSponsorshipController,
  uploadReceipt: uploadReceiptController,
  createPreEvaluation: createPreEvaluationController,
  getWhatsAppLink: getWhatsAppLinkController
};
