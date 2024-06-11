import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import { fileUpload, showImg } from '../controllers/uploads';
// Helpers
import { allowedCollections } from '../helpers/db';
// Middlewares
import { validateFields, validateFile, validateJWT } from '../middlewares';

/*
  PATH: '/api/uploads'
  DOC:
*/
const router: Router = Router();

router.put( '/:collection/:id', [
  validateJWT,
  check( 'id', 'Invalid mongo id' ).isMongoId(),
  check( 'collection' ).custom( c => allowedCollections( c, [ 'users', 'hospitals', 'doctors' ] ) ),
  validateFile,
  validateFields
], fileUpload );

router.get( '/:collection/:id',[
], showImg );

export default router;
