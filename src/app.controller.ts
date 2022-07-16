import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import path from "path";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("privacy")
  privacy(@Res() res): void {
    res.sendFile("privacy.html", { root: __dirname + "/../frontend" });
  }
}
