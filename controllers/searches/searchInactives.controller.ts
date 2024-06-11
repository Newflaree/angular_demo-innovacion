import { Request, Response } from 'express';
// Helpers
import { collectionFilter } from '../../helpers/db/collections.helper';

/*
  PATH: '/api/searches/:collection'
  DOC: 
*/
export const searchInactives = async ( req: Request, res: Response ) => {
  const { from = 0, limit = 2 } = req.query;
  const { collection } = req.params;

  try {
    const data = await collectionFilter(
      collection,
      Number( from ),
      Number( limit ),
      { status: false }
    );

    res.status( 200 ).json({
      ok: true,
      ...data,
    });
  } catch ( err ) {
    console.log( `${ '[CONTROLLER.SEARCH-INACTIVES]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}

