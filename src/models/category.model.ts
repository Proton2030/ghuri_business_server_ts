import { model } from "mongoose";
import { ICategorySchema } from "../ts/interfaces/category.interface";
import CategorySchema from "./shcemaDefinations/category.schema";

const CategoryModel = model<ICategorySchema>("Category", CategorySchema);

export default CategoryModel;
