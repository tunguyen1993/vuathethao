import {
  Controller,
  Injectable,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
  imageFileFilter,
  videoFileFilter,
} from "../../core/file-filters/file-upload.filters";
import { SharpPipeImage, SharpPipeVideo } from "../../core/pipes/sharp.pipe";

import { FileInterceptor } from "@nestjs/platform-express";
import { mixin, NestInterceptor, Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import * as fs from "fs";

@Controller("api/v1/upload-file")
export class UploadFileController {
  constructor() {}

  @Post("upload-single-image")
  @UseInterceptors(
    FilesInterceptor("image", 1, {
      fileFilter: imageFileFilter,
    }),
  )
  uploadSingleImage(@UploadedFiles(SharpPipeImage) files) {
    return {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data: files[0],
      message: "success",
    };
  }

  @Post("upload-single-video")
  @UseInterceptors(FilesInterceptor("image", 1))
  uploadSingleVideo(@UploadedFiles(SharpPipeVideo) file) {
    return {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data: file,
      message: "success",
    };
  }
}
