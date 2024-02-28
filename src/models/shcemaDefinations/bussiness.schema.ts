import { Schema, VirtualTypeOptions } from "mongoose";
import { IUserSchema } from "../../ts/interfaces/user.interface";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IBussiness, IBussinessSchema } from "../../ts/interfaces/bussiness.interface";


const BussinessSchema: Schema<IBussinessSchema> = new Schema<IBussinessSchema>(
	{
		name: SCHEMA_DEFINITION_PROPERTY.requiredString,
		phone_no: SCHEMA_DEFINITION_PROPERTY.requiredString,
		description: SCHEMA_DEFINITION_PROPERTY.requiredString,
		location: SCHEMA_DEFINITION_PROPERTY.requiredString,
		email:SCHEMA_DEFINITION_PROPERTY.requiredString,
		vacancy:SCHEMA_DEFINITION_PROPERTY.requiredString
	},
	GENERAL_SCHEMA_OPTIONS
);

export default BussinessSchema;
