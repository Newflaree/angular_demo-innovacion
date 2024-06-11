import { Request, Response } from 'express';
import { User } from '../../models';

/*
  PATH: '/api/users/:id'
  DOC: 
*/
export const getUser = async ( req: Request, res: Response ) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id });

    res.status( 200 ).json({
      ok: true,
      user
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.GET-USER]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
