import { IObjectId } from "./objectId.interface";

export interface ICategorySchema {
	category: string;
	is_active: boolean;
}

export interface ICategory extends ICategorySchema, IObjectId {}
