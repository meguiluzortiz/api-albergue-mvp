const { v4: uuidv4 } = require('uuid');
const { pets } = require('../data/store');

function listPets({ species, status, page = 1, limit = 12 }) {
  let filtered = [...pets];

  if (species) filtered = filtered.filter((pet) => pet.species === species);
  if (status) filtered = filtered.filter((pet) => pet.status === status);

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + Number(limit);

  return {
    page: Number(page),
    limit: Number(limit),
    total,
    items: filtered.slice(start, end)
  };
}

function getPetById(petId) {
  const pet = pets.find((item) => item.id === petId);

  if (!pet) {
    const error = new Error('Mascota no encontrada');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  return pet;
}

function createPet(data) {
  const pet = {
    id: uuidv4(),
    ...data,
    createdAt: new Date().toISOString()
  };

  pets.push(pet);
  return pet;
}

function updatePet(petId, data) {
  const pet = pets.find((item) => item.id === petId);

  if (!pet) {
    const error = new Error('Mascota no encontrada');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  Object.assign(pet, data);
  return pet;
}

module.exports = { listPets, getPetById, createPet, updatePet };
