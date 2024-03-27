import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { IAdd, IAddSchema } from "../../ts/interfaces/advertisement.interface";

const AdvertisementSchema: Schema<IAdd> = new Schema<IAdd>({
	photo: SCHEMA_DEFINITION_PROPERTY.optionalNullObject,
	target_url: SCHEMA_DEFINITION_PROPERTY.requiredString,
	active: SCHEMA_DEFINITION_PROPERTY.requiredBoolean
});

export default AdvertisementSchema;
