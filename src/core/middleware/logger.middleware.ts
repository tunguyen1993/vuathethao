import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { LoggingInterceptor } from "@algoan/nestjs-logging-interceptor";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const {
      httpVersion,
      headers,
      method,
      baseUrl,
      params,
      query,
      body,
      socket,
    } = req;
    console.log(
      "========================================================================",
    );
    console.log(
      "Request Url...",
      baseUrl,
      "Method",
      method,
      "with Query",
      query,
      "with Body",
      body,
    );
    console.log(
      "========================================================================",
    );
    const ip = headers["x-forwarded-for"] || socket.remoteAddress;
    next();
  }
}
