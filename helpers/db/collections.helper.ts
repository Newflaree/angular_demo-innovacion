// Models
import { Doctor, Hospital, User } from "../../models";

interface ConditionProps {
  name?: string | RegExp;
  status: boolean;
}

interface ResultsProps {
  total: number,
  results: any
}

export const allowedCollections = ( collection: string, collections: string[] ) => {
  const included = collections.includes( collection );

  if ( !included ) {
    throw new Error( `${ collection } collection is not allowed` );
  }

  return true;
}

export const collectionFilter = async (
  collection: string, 
  from?: number,
  limit?: number,
  condition: ConditionProps = { status: true }
): Promise<ResultsProps | undefined> => {
  let total;
  let results;

  try {
    switch ( collection ) {
      case 'users':
        [ total, results ] = await Promise.all([
          User.countDocuments( condition ),
          User.find( condition )
            .skip( from || 0 )
            .limit( limit || 5 )
        ]);

        return {
          total: total || 0,
          results: results || []
        }

      case 'hospitals':
        [ total, results ] = await Promise.all([
          Hospital.countDocuments( condition ),
          Hospital.find( condition )
            .populate( 'user', 'name img' )
            .skip( Number( from ) )
            .limit( Number( limit ) )
        ]);

        return {
          total: total || 0,
          results: results || []
        }

      case 'doctors':
        [ total, results ] = await Promise.all([
          Doctor.countDocuments( condition ),
          Doctor.find( condition )
            .populate( 'user', 'name img' )
            .populate( 'hospital', 'name img' )
            .skip( Number( from ) )
            .limit( Number( limit ) )
        ]);

        return {
          total: total || 0,
          results: results || []
        }

      default:
        return {
          total: 0,
          results: []
        }
    }
  } catch ( err ) {
    console.log( `${ '[HELPER.COLLECTIONS]'.red }: Error details - ${ err }` );
  }
}
