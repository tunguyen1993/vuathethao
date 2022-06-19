import { Injectable, PipeTransform } from "@nestjs/common";
import * as path from "path";
import * as sharp from "sharp";
import { v4 as uuid } from "uuid";

@Injectable()
export class SharpPipeImage
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(images: any): Promise<any> {
    let files = [];
    if (images) {
      images.map(async (image) => {
        const filename = uuid() + ".webp";
        files.push(filename);
        await sharp(image.buffer)
          .resize(800)
          .webp({ effort: 3 })
          .toFile(path.join("./assets/images", filename));
      });
    }
    return files;
  }
}

@Injectable()
export class SharpPipeVideo
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(videos: any): Promise<any> {
    console.log("========================");
    console.log(videos);
    let files = [];
    if (videos) {
      videos.map(async (video) => {
        const filename = uuid() + video.originalname;
        files.push(filename);
        await sharp(video.buffer).toFile(
          path.join("./assets/videos", filename),
        );
      });
    }
    console.log(files);

    return files;
  }
}
