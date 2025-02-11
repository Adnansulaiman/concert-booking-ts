import express from 'express';
import { verifyUser,verifyAdmin } from '../middlewares/auth.middlware';
import upload from '../middlewares/upload.middleware';
import { createUpcoming, deleteAUpcoming, getAllUpcoming, getUserUpcoming, updateAUpcoming } from '../controllers/upcoming.controllers';

const router = express.Router();

router.get('/',getAllUpcoming)
router.post('/',verifyUser,verifyAdmin,upload.single('image'),createUpcoming);
router.get('/user',verifyUser,verifyAdmin,getUserUpcoming)
router.put('/:id',verifyUser,verifyAdmin,updateAUpcoming)
router.delete('/:id',verifyUser,verifyAdmin,deleteAUpcoming)


export default router;