import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidateInputPipe } from "./core/pipes/validate.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let whitelist = [
    "http://localhost:4200",
    "http://43.200.20.68",
    "http://localhost:3000",
    "https://thethaovua.org",
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        console.log("allowed cors for:", origin);
        callback(null, true);
      } else {
        console.log("blocked cors for:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    allowedHeaders: "*",
    methods: "*",
    credentials: true,
  });
  app.useGlobalPipes(new ValidateInputPipe());

  await app.listen(3000);
}
bootstrap().then((r) => r);
