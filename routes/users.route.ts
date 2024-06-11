import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../controllers/users';
// Helpers
import { idValidation } from '../helpers/db/users.helper';
// Middlewares
import { validateFields, validateJWT, validateRole } from '../middlewares';

/*
  PATH: '/api/users'
*/
const router: Router = Router();

router.get( '/', [
  validateJWT,
  validateRole,
  validateFields
], getUsers );

router.get( '/:id', [
  validateJWT,
  validateRole,
  check( 'id', 'Invalid id' ).isMongoId(),
  check( 'id' ).custom( idValidation ),
  validateFields
], getUser );

router.put( '/:id', [
  validateJWT,
  validateRole,
  check( 'id', 'Invalid id' ).isMongoId(),
  check( 'id' ).custom( idValidation ),
  validateFields
], updateUser );

router.delete( '/:id', [
  validateJWT,
  validateRole,
  check( 'id', 'Invalid id' ).isMongoId(),
  check( 'id' ).custom( idValidation ),
  validateFields
], deleteUser );

export default router;
