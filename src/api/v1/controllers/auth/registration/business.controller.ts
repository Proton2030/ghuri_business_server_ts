import { Request, Response, Router } from "express";
import BussinessModel from "../../../../../models/bussiness.model";



export const createBusiness = async (req: Request, res: Response) => {
    try {
        const { name, phone_no, description, location, email, vacancy } = req.body;

        const newBusiness = new BussinessModel({
            name,
            phone_no,
            description,
            location,
            email,
            vacancy
        });

        const businessInctance = await newBusiness.save();

        return res.status(200).send({
            message: "Business created successfully",
            result:businessInctance
        });
    } catch (error) {
        console.error("Error in posting business:", error);
        return res.status(400).send({
            message: "Internal server error",
        });
    }
};

export const GetAllBusiness = async (req: Request, res: Response) => {
    try {
        const businesses = await BussinessModel.find();

        return res.status(200).send({
            businesses,
        });
    } catch (error) {
        console.error("Error in getting all businesses:", error);
        return res.status(400).send({
            message: "Internal server error",
        });
    }
}


