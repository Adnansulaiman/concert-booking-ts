import express from 'express';
import { createConcert, deleteAConcert, getAConcert, getAllConcerts, updateAConcert } from '../controllers/concert.controllers';
const router = express.Router();

router.post('/',createConcert);
router.get('/',getAllConcerts);
router.get('/:id',getAConcert);
router.put('/:id',updateAConcert);
router.delete('/:id',deleteAConcert);

export default router;