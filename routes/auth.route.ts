import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import { authLogin, authRegister, renewToken } from '../controllers/auth';
// Helpers
import { emailValidation } from '../helpers/db/users.helper';
// Middlewares
import { validateFields, validateJWT } from '../middlewares';

/*
  PATH: '/api/auth'
*/
const router: Router = Router();

router.post( '/register', [
  check( 'name', 'Name is required' ).not().isEmpty(),
  check( 'email', 'Email is required' ).isEmail(),
  check( 'password', 'Password must be longer than 6 characters' ).isLength({ min: 6 }),
  check( 'email' ).custom( emailValidation ),
  validateFields
], authRegister );

router.post( '/login', [
  check( 'email', 'Email is required' ).isEmail(),
  check( 'password', 'Password is required' ).not().isEmpty(),
  validateFields
], authLogin );

router.get( '/renew', [
  validateJWT,
  validateFields
], renewToken );

export default router;
