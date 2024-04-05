import NotificationModel from "../../models/notification.model";
import { INotification } from "../../ts/interfaces/notification.interface";
import { sendPushNotification } from "./sendNotification";

export async function createNotification(userObjectId: string, notificationTitle: string): Promise<INotification> {
	try {
		const newNotification = new NotificationModel({
			user_object_id: userObjectId,
			notification_title: notificationTitle
		});
		await sendPushNotification({
			body: notificationTitle,
			title: notificationTitle
		},userObjectId);
		const savedNotification = await newNotification.save();
		return savedNotification;
	} catch (error) {
		throw new Error(`Error creating notification: ${error}`);
	}
}
