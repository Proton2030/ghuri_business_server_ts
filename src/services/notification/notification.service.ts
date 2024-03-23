import NotificationModel from "../../models/notification.model";
import { INotification } from "../../ts/interfaces/notification.interface";

export async function createNotification(userObjectId: string, notificationTitle: string): Promise<INotification> {
	try {
		const newNotification = new NotificationModel({
			user_object_id: userObjectId,
			notification_title: notificationTitle
		});

		const savedNotification = await newNotification.save();
		return savedNotification;
	} catch (error) {
		throw new Error(`Error creating notification: ${error}`);
	}
}
