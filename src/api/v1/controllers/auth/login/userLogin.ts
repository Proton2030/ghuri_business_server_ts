import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";
import { MESSAGE } from "../../../../../constants/message";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { full_name, email } = req.body;
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(200).json({
        message:MESSAGE.post.succ,
        result:existingUser
      });
    }
    
    const newUser = new UserModel({
      full_name: full_name,
      email: email,
      is_Premium: false
    });

    const reseponse = await newUser.save();

    return res.status(200).json({
      message:MESSAGE.post.succ,
      result:reseponse
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json(
      {
        message: MESSAGE.post.fail,
        error 
      }
      );
  }
};
