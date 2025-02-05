import express from 'express';
import { createConcert, deleteAConcert, getAConcert, getAllConcerts, getUserConcert, updateAConcert } from '../controllers/concert.controllers';
import { verifyUser,verifyAdmin } from '../middlewares/auth.middlware';
import upload from '../middlewares/upload.middleware';

const router = express.Router();

router.post('/',verifyUser,verifyAdmin,upload.single('image'),createConcert);
// router.get('/',verifyUser,getAllConcerts);
router.get('/',verifyUser,getUserConcert);
router.get('/:id',verifyUser,getAConcert);
router.put('/:id',verifyUser,verifyAdmin,updateAConcert);
router.delete('/:id',verifyUser,verifyAdmin,deleteAConcert);

export default router;