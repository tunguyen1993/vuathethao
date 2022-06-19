import { extname } from "path";
import { v4 as uuid } from "uuid";

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

export const videoFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(mp4|webm|x-m4v)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};
