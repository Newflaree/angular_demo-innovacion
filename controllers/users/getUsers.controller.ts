import { Request, Response } from 'express';
// Models
import { User } from '../../models';

/*
  PATH: '/api/users'
  DOC: 
*/
export const getUsers = async ( req: Request, res: Response ) => {
  const { from = 0, limit = 5 } = req.query;
  const condition = { status: true };

  try {
    const [ total, users ] = await Promise.all([
      User.countDocuments( condition ),
      User.find( condition )
        .skip( Number( from ) )
        .limit( Number( limit ) )
    ]);

    res.status( 200 ).json({
      ok: true,
      total,
      users
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.GET-USERS]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
