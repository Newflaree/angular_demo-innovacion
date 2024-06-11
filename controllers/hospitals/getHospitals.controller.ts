import { Request, Response } from 'express';
// Models
import { Hospital } from '../../models';

/*
  PATH: '/api/hospitals'
  DOC: 
*/
export const getHospitals = async ( req: Request, res: Response ) => {
  const { from = 0, limit = 5 } = req.query;
  const condition = { status: true };

  try {
    const [ total, hospitals ] = await Promise.all([
      Hospital.countDocuments( condition ),
      Hospital.find( condition )
        .populate( 'user', 'name img' )
        .skip( Number( from ) )
        .limit( Number( limit ) )
    ]);

    res.status( 200 ).json({
      ok: true,
      total,
      hospitals
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.GET-HOSPITALS]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
