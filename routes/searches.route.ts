import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import { collectionSearch, globalSearch, searchInactives } from '../controllers/searches';
// Helpers
import { allowedCollections } from '../helpers/db';
// Middlewares
import { validateFields, validateJWT } from '../middlewares';

/*
  PATH: '/api/searches'
*/
const router: Router = Router();

router.get( '/global/:term', [
  validateJWT,
  validateFields
], globalSearch );

router.get( '/:collection', [
  validateJWT,
  check( 'collection' ).custom( c => allowedCollections( c, [ 'users', 'hospitals', 'doctors' ] ) ),
  validateFields
], searchInactives );

router.get( '/:collection/:term', [
  validateJWT,
  check( 'collection' ).custom( c => allowedCollections( c, [ 'users', 'hospitals', 'doctors' ] ) ),
  validateFields
], collectionSearch );

export default router;
