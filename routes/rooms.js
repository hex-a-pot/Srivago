import express from 'express';
const router = express.Router();
import { createRoom,deleteRoom,updateRoom,getAllRooms,getRoom } from '../controllers/room.js';
import {verifyAdmin} from '../utils/verifyToken.js'


//CREATE ROOM
router.post('/createRoom',verifyAdmin,createRoom)

//DELETE ROOM
router.delete('/:roomId/:hotelId',verifyAdmin,deleteRoom)

//UPDATE ROOM
router.put('/:roomId',verifyAdmin,updateRoom)

//GET ROOM
router.get('/:roomId',getRoom)

//GET ALL ROOM
router.get('/',getAllRooms)


export default router;