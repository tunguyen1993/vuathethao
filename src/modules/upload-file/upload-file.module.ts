import { Module } from "@nestjs/common";
import { UploadFileController } from "./upload-file.controller";

@Module({
  providers: [],
  exports: [],
  controllers: [UploadFileController],
})
export class UploadFileModule {}
