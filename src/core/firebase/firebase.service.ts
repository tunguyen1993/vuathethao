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
    console.log(`${topic_id}`, payload);

    firebase
      .messaging()
      .sendToTopic(`${process.env.TOPIC_FIREBASE}_${topic_id}`, payload)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  }
}
