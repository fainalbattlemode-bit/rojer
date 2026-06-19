import express from 'express';
import {
  createResearch,
  getResearch,
  listResearch,
} from '../controllers/research.controller';

const router = express.Router();

router.post('/', createResearch);
router.get('/list', listResearch);
router.get('/:researchId', getResearch);

export default router;
