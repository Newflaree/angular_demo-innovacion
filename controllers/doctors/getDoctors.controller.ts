import { Request, Response } from 'express';
// Models
import { Doctor } from '../../models';

/*
  PATH: '/api/doctors'
  DOC: 
*/
export const getDoctors = async ( req: Request, res: Response ) => {
  const { from = 0, limit = 5 } = req.query;
  const condition = { status: true };

  try {
    const [ total, doctors ] = await Promise.all([
      Doctor.countDocuments( condition ),
      Doctor.find( condition )
        .populate( 'user', 'name img' )
        .populate( 'hospital', 'name img' )
        .skip( Number( from ) )
        .limit( Number( limit ) )
    ]);

    res.status( 200 ).json({
      ok: true,
      total,
      doctors
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.GET-DOCTORS]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
