const { listSponsorships, getSponsorshipById, reviewSponsorship } = require('../services/sponsorshipService');
const { createPet, updatePet } = require('../services/petService');

function listSponsorshipsController(req, res, next) {
  try {
    const { status } = req.query;
    return res.status(200).json({ items: listSponsorships(status) });
  } catch (error) {
    return next(error);
  }
}

function getSponsorshipByIdController(req, res, next) {
  try {
    const sponsorship = getSponsorshipById(req.params.sponsorshipId);
    return res.status(200).json(sponsorship);
  } catch (error) {
    return next(error);
  }
}

function reviewSponsorshipController(req, res, next) {
  try {
    const { action, note } = req.body;
    const sponsorship = reviewSponsorship(req.params.sponsorshipId, action, note);
    return res.status(200).json(sponsorship);
  } catch (error) {
    return next(error);
  }
}

function createPetController(req, res, next) {
  try {
    const pet = createPet(req.body);
    return res.status(201).json(pet);
  } catch (error) {
    return next(error);
  }
}

function updatePetController(req, res, next) {
  try {
    const pet = updatePet(req.params.petId, req.body);
    return res.status(200).json(pet);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listSponsorships: listSponsorshipsController,
  getSponsorshipById: getSponsorshipByIdController,
  reviewSponsorship: reviewSponsorshipController,
  createPet: createPetController,
  updatePet: updatePetController
};
