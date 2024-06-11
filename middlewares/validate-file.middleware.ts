import { NextFunction, Request, Response } from 'express';
// Interfaces
import { FileRequest } from '../interfaces/http-interfaces';


export const validateFile = ( req: FileRequest, res: Response, next: NextFunction ) => {
  if ( !req.files || Object.keys( req.files ).length === 0 || !req.files.file ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'No files were uploads'
    });
  }
	
  next();
}
