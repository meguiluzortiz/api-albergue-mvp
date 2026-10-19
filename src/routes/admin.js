const express = require('express');
const { z } = require('zod');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  listSponsorships,
  getSponsorshipById,
  reviewSponsorship,
  createPet,
  updatePet
} = require('../controllers/adminController');

const router = express.Router();

const petCreateSchema = z.object({
  name: z.string().min(2),
  species: z.enum(['dog', 'cat']),
  sex: z.enum(['male', 'female']),
  ageMonths: z.number().int().nonnegative(),
  status: z.enum(['available', 'sponsored', 'adopted']).default('available'),
  sponsorshipMonthlyAmount: z.number().positive().optional(),
  photoUrl: z.string().url().optional()
});

const petUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  species: z.enum(['dog', 'cat']).optional(),
  sex: z.enum(['male', 'female']).optional(),
  ageMonths: z.number().int().nonnegative().optional(),
  status: z.enum(['available', 'sponsored', 'adopted']).optional(),
  sponsorshipMonthlyAmount: z.number().positive().optional(),
  photoUrl: z.string().url().optional()
}).partial();

const reviewSchema = z.object({
  action: z.enum(['approve', 'reject']),
  note: z.string().max(300).optional()
});

router.use(requireAuth);
router.get('/sponsorships', listSponsorships);
router.get('/sponsorships/:sponsorshipId', getSponsorshipById);
router.patch('/sponsorships/:sponsorshipId/review', validate(reviewSchema), reviewSponsorship);
router.post('/pets', validate(petCreateSchema), createPet);
router.patch('/pets/:petId', validate(petUpdateSchema), updatePet);

module.exports = router;
