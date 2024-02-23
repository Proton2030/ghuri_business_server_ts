import { IObjectId } from "./objectId.interface";

export interface IUserSchema {
full_name: string;
phone_no: string;
email:string;
password:string;

}

export interface IUser extends IUserSchema, IObjectId {}
