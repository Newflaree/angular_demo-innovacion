import { Request, Response } from 'express';
// Models
import { Doctor, Hospital, User } from '../../models';

/*
  PATH: '/api/searches/global/:term'
  DOC: 
*/
export const globalSearch = async ( req: Request, res: Response ) => {
  const { from = 0, limit = 5 } = req.query;
  const { term } = req.params;
  const regex = new RegExp( term, 'i' );
  const condition = {
    name: regex,
    status: true
  };

  try {
    const [ users, hospitals, doctors ] = await Promise.all([
      User.find( condition ),

      Hospital.find( condition )
        .populate( 'user', 'name img' ),

      Doctor.find( condition )
        .populate( 'user', 'name img' )
        .populate( 'hospital', 'name img' )
    ]);

    res.status( 200 ).json({
      ok: true,
      results: {
        users,
        hospitals,
        doctors
      }
    });
  } catch ( err ) {
    console.log( `${ '[CONTROLLER.GLOBAL-SEARCH]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}

