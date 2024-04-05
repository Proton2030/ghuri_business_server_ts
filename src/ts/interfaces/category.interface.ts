import { IObjectId } from "./objectId.interface";

export interface ICategorySchema {
	category: string;
	is_active: boolean;
	photo: string[];
}

export interface ICategory extends ICategorySchema, IObjectId {}

//hello
