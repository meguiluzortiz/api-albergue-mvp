const express = require('express');
const multer = require('multer');
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const {
  listPets,
  getPetById,
  createSponsorship,
  uploadReceipt,
  createPreEvaluation,
  getWhatsAppLink
} = require('../controllers/publicController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const createSponsorshipSchema = z.object({
  petId: z.string().uuid(),
  donorName: z.string().min(2),
  donorPhone: z.string().min(7),
  amount: z.number().positive(),
  operationNumber: z.string().min(3)
});

const preEvaluationSchema = z.object({
  petId: z.string().uuid(),
  applicantName: z.string().min(2),
  applicantPhone: z.string().min(7),
  district: z.string().min(2),
  homeType: z.enum(['house', 'apartment', 'other']),
  familyAgreement: z.boolean(),
  economicStability: z.boolean(),
  sterilizationCommitment: z.boolean(),
  notes: z.string().max(500).optional()
});

router.get('/pets', listPets);
router.get('/pets/:petId', getPetById);
router.post('/sponsorships', validate(createSponsorshipSchema), createSponsorship);
router.post('/sponsorships/:sponsorshipId/receipt', upload.single('receipt'), uploadReceipt);
router.post('/adoptions/pre-evaluations', validate(preEvaluationSchema), createPreEvaluation);
router.get('/adoptions/pre-evaluations/:preEvaluationId/whatsapp-link', getWhatsAppLink);

module.exports = router;
