import { Request } from "express";
import * as multer from "multer";

export interface UserRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
  file?: multer.Multer.File;
}
