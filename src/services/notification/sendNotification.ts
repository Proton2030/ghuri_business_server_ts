import * as admin from "firebase-admin";
import { IPushNotification } from "../../ts/interfaces/pushNotification.types";
import UserModel from "../../models/user.model";

// Replace the path with the actual path to your serviceAccountKey.json
const serviceAccount = require("../config/service-account.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (notification: IPushNotification, userId: string) => {
	const userInstance = await UserModel.findById(userId);
	if (userInstance) {
		if (userInstance.device_token.length > 5) {
			const message: admin.messaging.Message = {
				notification: {
					title: notification.title,
					body:  notification.body,
				},
				token: userInstance.device_token
			};
			// Send the message
			admin.messaging().send(message)
				.then((response: any) => {
					console.log("Successfully sent message:", response);
				})
				.catch((error: any) => {
					console.error("Error sending message:", error);
				});
		}
		else {
			console.log("invalid Device Token")
		}
	}
	else {
		console.log("invalid userid")
	}
}