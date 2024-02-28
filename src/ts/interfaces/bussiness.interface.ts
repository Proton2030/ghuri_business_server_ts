import { IObjectId } from "./objectId.interface";

export interface IBussinessSchema {
name: string;
phone_no: string;
email:string;
location:string;
description:string,
vacancy:string,


}

export interface IBussiness extends IBussinessSchema, IObjectId {}
