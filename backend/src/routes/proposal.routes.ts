import express from 'express';
import {
  createProposal,
  getProposal,
  updateProposal,
  deleteProposal,
} from '../controllers/proposal.controller';

const router = express.Router();

router.post('/', createProposal);
router.get('/:proposalId', getProposal);
router.put('/:proposalId', updateProposal);
router.delete('/:proposalId', deleteProposal);

export default router;
