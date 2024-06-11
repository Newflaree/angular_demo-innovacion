import { Request, Response } from 'express';
// Models
import { User } from '../../models';

/*
  PATH: '/api/users/:id'
  DOC: 
*/
export const deleteUser = async ( req: Request, res: Response ) => {
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate( id, { status: false } );

    res.status( 200 ).json({
      ok: true,
      msg: `User was successfully deleted`
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.DELETE-USER]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
