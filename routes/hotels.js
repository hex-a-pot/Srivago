import express from 'express';
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

//POST
router.post('/',verifyAdmin,createHotel)

//PUT
router.put('/:id',verifyAdmin,updateHotel)

//DELETE
router.delete('/:id',verifyAdmin,deleteHotel)

//GET
router.get('/:id',getHotel)

//GET ALL
router.get('/',getAllHotels)

export default router;