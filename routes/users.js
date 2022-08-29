import express from 'express';
const router = express.Router();

import {updateUser,deleteUser,getUser,getAllUsers} from "../controllers/user.js"
import {verifyUser,verifyAdmin} from '../utils/verifyToken.js';


//PUT
router.put('/:id',verifyUser,updateUser)

//DELETE
router.delete('/:id',verifyUser,deleteUser)

//GET
router.get('/:id',verifyUser,getUser)

//GET ALL
router.get('/',verifyAdmin,getAllUsers)

export default router;