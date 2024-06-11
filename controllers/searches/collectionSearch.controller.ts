import { Request, Response } from 'express';
// Helpers
import { collectionFilter } from '../../helpers/db/collections.helper';

/*
  PATH: '/api/searches/:collection/:term'
  DOC: 
*/
export const collectionSearch = async ( req: Request, res: Response ) => {
  const { from = 0, limit = 5 } = req.query;
  const { collection } = req.params;
  const { term } = req.params;
  const regex = new RegExp( term, 'i' );
  const condition = {
    name: regex,
    status: true
  };

  try {
    const data = await collectionFilter(
      collection,
      Number(from),
      Number(limit),
      condition 
    );

    res.status(200).json({
      ok: true,
      ...data
    });

  } catch ( err ) {
    console.log( `${ '[CONTROLLER.COLLECTION-SEARCH]'.red }: Error details - ${ err }` );
    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Admin.'
    });
  }
}
