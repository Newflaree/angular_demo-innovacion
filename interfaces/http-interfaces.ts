import { Request } from "express";

export interface  UserAuthRequest extends Request {
  user?: any;
}

export interface FileRequest extends Request {
  files?: any; 
}
