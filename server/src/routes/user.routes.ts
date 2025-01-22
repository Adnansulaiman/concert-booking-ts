import express from 'express';
const router = express.Router();
import { deleteAUser, getAllUser, getAUser, updateAUser } from '../controllers/user.controllers';


router.get('/',getAllUser);
router.get('/:id',getAUser);
router.put('/:id',updateAUser);
router.delete('/:id',deleteAUser);


export default router;
