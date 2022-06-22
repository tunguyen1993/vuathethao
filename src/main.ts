import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidateInputPipe } from "./core/pipes/validate.pipe";
import * as admin from "firebase-admin";
import * as serviceAccount from "./core/firebase/firebaseServiceAccount.json";

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // let whitelist = [
  //   "http://localhost:4200",
  //   "http://43.200.20.68",
  //   "http://localhost:3000",
  //   "https://thethaovua.org",
  // ];

  admin.initializeApp({
    credential: admin.credential.cert(firebase_params),
  });

  app.enableCors();

  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1 || !origin) {
  //       console.log("allowed cors for:", origin);
  //       callback(null, true);
  //     } else {
  //       console.log("blocked cors for:", origin);
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  //   allowedHeaders: "*",
  //   methods: "*",
  //   credentials: true,
  // });
  app.useGlobalPipes(new ValidateInputPipe());

  await app.listen(3000);
}
bootstrap().then((r) => r);
