import * as firebase from "firebase-admin";

interface notifyInterface {
  title: string;
  body: any;
}

export class FirebaseService {
  pushTopicNotify(topic_id, message: notifyInterface) {
    const payload = {
      notification: {
        ...message,
      },
    };

    firebase
      .messaging()
      .sendToTopic(`${topic_id}`, payload)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  }
}
