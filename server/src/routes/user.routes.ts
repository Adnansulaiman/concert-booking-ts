import express from 'express';
import { deleteAUser, getAllUser, getAUser, updateAUser } from '../controllers/user.controllers';

const router = express.Router();


router.get('/',getAllUser);
router.get('/:id',getAUser);
router.put('/:id',updateAUser);
router.delete('/:id',deleteAUser);


export default router;
