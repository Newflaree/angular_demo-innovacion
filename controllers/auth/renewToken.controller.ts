import { Response } from 'express';
// Interfaces
import { UserAuthRequest } from '../../interfaces/http-interfaces';
// Helpers
import { generateJWT } from '../../helpers/jwt';
// Modesls
import { User } from '../../models';
import {getManuFront} from '../../helpers/menu-front';

/*
  PATH: '/api/auth/renew'
  DOC: 
*/
export const renewToken = async ( req: UserAuthRequest, res: Response ) => {
  const { _id } = req.user;

  try {
    const [ user, token ] = await Promise.all([
      User.findById( _id ),
      generateJWT( _id )
    ]);

    res.status( 200 ).json({
      ok: true,
      user,
      menu: getManuFront( user?.role ),
      token
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.AUTH.LOGIN]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
