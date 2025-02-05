import express from 'express';
const router = express.Router();
import { deleteAUser, getAllUser,getUserDetails , updateUserDetails } from '../controllers/user.controllers';
import { verifyUser } from '../middlewares/auth.middlware';


// router.get('/',getAllUser);
router.get('/',verifyUser,getUserDetails);
router.put('/',verifyUser,updateUserDetails);
router.delete('/:id',deleteAUser);


export default router;
