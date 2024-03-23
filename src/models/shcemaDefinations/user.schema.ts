import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IUserDetails } from "../../ts/interfaces/userDetails.types";

const UserSchema: Schema<IUserDetails> = new Schema<IUserDetails>(
	{
		full_name: SCHEMA_DEFINITION_PROPERTY.requiredString,
		email: SCHEMA_DEFINITION_PROPERTY.requiredString,
		photo_url: SCHEMA_DEFINITION_PROPERTY.optionalNullString
	},
	GENERAL_SCHEMA_OPTIONS
);

export default UserSchema;
