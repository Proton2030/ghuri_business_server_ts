import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";
import { MESSAGE } from "../../../../../constants/message";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const existingUser = await UserModel.findOne({ email: payload.email });

    if (existingUser) {
      await UserModel.findOneAndUpdate({email:payload.email},{$set:{device_token: payload.device_token}});
      return res.status(200).json({
        message:MESSAGE.post.succ,
        result:existingUser
      });
    }
    
    const newUser = new UserModel(payload);

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
