import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  const hotelId = req.params.hotelId;
  try {
    const savedRoom = await newRoom.save();
    try {
        await Hotel.findByIdAndUpdate(hotelId,{
            $push :{rooms : savedRoom._id}
        })   
    } catch (error) { return next(err)}
    res.status(200).json("New Room has been created successfully!!");
  } catch (err) {
    return next(err);
  }
};
