import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { imageFileFilter } from "../../core/file-filters/file-upload.filters";
import { SharpPipeImage, SharpPipeVideo } from "../../core/pipes/sharp.pipe";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { v4 } from "uuid";

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

  @Post("upload-video")
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./assets/videos",
        filename: (req, file, cb) => {
          return cb(null, `${v4().replace(/-/g, "")}.mp4`);
        },
      }),
    }),
  ) // 👈 field name must match
  @ApiConsumes("multipart/form-data")
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data: file.filename,
      message: "success",
    };
  }
}
