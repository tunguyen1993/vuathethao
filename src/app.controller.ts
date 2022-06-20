import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import path from "path";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res): void {
    res.sendFile("index.html", { root: __dirname + "/../frontend" });
  }
}
