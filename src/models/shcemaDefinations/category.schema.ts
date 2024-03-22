import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { ICategorySchema } from "../../ts/interfaces/category.interface";

const CategorySchema: Schema<ICategorySchema> = new Schema<ICategorySchema>({
	category: SCHEMA_DEFINITION_PROPERTY.requiredString,
	is_active: SCHEMA_DEFINITION_PROPERTY.optionalBoolean
});

export default CategorySchema;
