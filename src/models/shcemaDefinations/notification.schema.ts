import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { INotification } from "../../ts/interfaces/notification.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";

const notificationSchema: Schema<INotification> = new Schema<INotification>(
	{
		user_object_id: SCHEMA_DEFINITION_PROPERTY.requiredObjectId,
		notification_title: SCHEMA_DEFINITION_PROPERTY.requiredString
	},
	GENERAL_SCHEMA_OPTIONS
);

export default notificationSchema;
