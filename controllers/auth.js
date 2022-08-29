import User from "../models/User.js";
import {createError} from '../utils/error.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const register = async (req,res,next)=>{

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password,salt);

    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashPass
    });
    try {
        await newUser.save();
        res.status(200).json("User has been saved successfully!!");
    }
    catch(error){
        return next(error);
    }
}

export const login = async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user)
        return next(createError(404,"User Not Found"))
        
        const isCorrectPassword = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrectPassword)
        return next(createError(401,"Unauthorized access!!"))

        const token = jwt.sign({id:user._id, isAdmin : user.isAdmin},process.env.SECRET_KEY)
        
        const {password, isAdmin, ...otherDetails} = user._doc;

        res.cookie("access_token",token,{httpOnly:true}).status(200).json(otherDetails)
        
    }catch(error){
        return next(error)
    }

}