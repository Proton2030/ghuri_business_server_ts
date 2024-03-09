import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IBussinessSchema } from "../../ts/interfaces/bussiness.interface";
import UserModel from "../user.model";

const BussinessSchema: Schema<IBussinessSchema> = new Schema<IBussinessSchema>(
	{
		user_object_id: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		name: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		phone_no: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		description: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		location: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		category: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		email: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		photo: SCHEMA_DEFINITION_PROPERTY.optionalNullObject,
		status: { ...SCHEMA_DEFINITION_PROPERTY.optionalNullString, default: "PENDING" }
	},
	{ ...GENERAL_SCHEMA_OPTIONS, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const userVirtualReference: VirtualTypeOptions<IBussinessSchema> = {
	ref: UserModel,
	localField: "user_object_id",
	foreignField: "_id",
	justOne: true
};

BussinessSchema.virtual("user_details", userVirtualReference);

export default BussinessSchema;
