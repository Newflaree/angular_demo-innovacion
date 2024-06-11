import { Request, Response } from 'express';
import bcript from 'bcryptjs';
// Models
import { User } from '../../models';

/*
  PATH: '/api/users/:id'
  DOC: 
*/
export const updateUser = async ( req: Request, res: Response ) => {
  const { id } = req.params;
  const { _id, email, password, status, ...rest } = req.body;
   
  try {
    if ( password ) {
      const salt = bcript.genSaltSync();
      rest.password = bcript.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

    res.status( 200 ).json({
      ok: true,
      user
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.UPDATE-USER]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
