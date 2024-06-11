import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
// Interfaces
import { UserAuthRequest } from "../interfaces/http-interfaces";
// Models
import { User } from "../models";


export const validateJWT = async ( req: UserAuthRequest, res: Response, next: NextFunction ) => {
  const token = req.header( 'x-token' );

  if ( !token ) {
    return res.status( 401 ).json({
      ok: false,
      msg: 'There is no token in the request'
    });
  }

  try {
    const { uid }: any = jwt.verify( token, process.env.SECRET_KEY || '' );
    const user = await User.findById({ _id: uid }) || { status: false }

    if ( !user ) {
      res.status( 401 ).json({
        ok: false,
        msg: 'Token is invalid'
      });
    }

    if ( !user.status ) {
      res.status( 401 ).json({
        ok: false,
        msg: 'Token is invalid'
      });
    }

    req.user = user;
    next();

  } catch ( err ) {
    console.log( `${ '[MIDDLEWARE.VALIDATE-JWT]'.red }: Error details - ${ err }` );
    res.status( 401 ).json({
      ok: false,
      msg: 'Token is invalid'
    });
  }
}
