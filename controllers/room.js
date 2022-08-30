import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  const hotelId = req.params.hotelId;
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }
      })
    } catch (error) { return next(err) }
    res.status(200).json("New Room has been created successfully!!");
  } catch (err) {
    return next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId, { $set: req.body }, { new: true })
    res.status(200).json(updatedRoom)
  } catch (error) {
    return next(error)
  }
}

export const deleteRoom = async (req, res, next) => {
  const roomId = req.params.roomId
  const hotelId = req.params.hotelId

  await Room.findByIdAndDelete(roomId)
  try {
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: {
        rooms: roomId
      }
    })
  } catch (error) {
    return next(error)
  }
}

export const getRoom = async(req,res,next) => {
  try {
    const fetchedRoom = Room.findById(req.params.roomId)
    res.status(200).json(fetchedRoom)
  } catch (error) {
    return next(error)
  }
}

export const getAllRooms = async(req,res,next) => {
  try {
    const fetchedRooms = Room.find()
    res.status(200).json(fetchedRooms)
  } catch (error) {
    return next(error)
  }
}
