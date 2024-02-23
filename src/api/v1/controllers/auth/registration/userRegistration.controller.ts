import { Request, Response } from "express";
import bcrypt from "bcryptjs"; 
import UserModel from "../../../../../models/user.model";

// Signup function
export const signup = async (req: Request, res: Response) => {
    try {
        const { full_name, phone_no, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            full_name,
            phone_no,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(200).send({
            message: "User created successfully",
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(400).send({
            message: "Internal server error",
        });
    }
};

// Signin function
export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid password",
            });
        }

        return res.status(200).send({
            message: "Login successful",
            user: {
                full_name: user.full_name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error in signin:", error);
        return res.status(400).send({
            message: "Internal server error",
        });
    }
};
