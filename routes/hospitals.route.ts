import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import { 
  createHospital,
  deleteHospital,
  getHospital,
  getHospitals,
  updateHospital
} from '../controllers/hospitals';
// Helpers
import { hospitalIdValidation, hospitalValidation } from '../helpers/db';
// Middlewares
import { validateFields, validateJWT } from '../middlewares';

/*
  PATH: '/api/hospitals'
*/
const router: Router = Router();

router.post( '/', [
  validateJWT,
  check( 'name', 'Name is required' ).not().isEmpty(),
  check( 'name' ).custom( hospitalValidation ),
  validateFields
], createHospital );

router.get( '/', [
  validateJWT,
  validateFields
], getHospitals );

router.get( '/:id', [
  validateJWT,
  check( 'id', 'Invalid id' ).isMongoId(),
  check( 'id' ).custom( hospitalIdValidation ),
  validateFields
], getHospital );

router.put( '/:id', [
  validateJWT,
  check( 'name', 'Name is required' ).not().isEmpty(),
  check( 'name' ).custom( hospitalValidation ),
  check( 'id', 'Invalid id' ).isMongoId(),
  check( 'id' ).custom( hospitalIdValidation ),
  validateFields
], updateHospital );

router.delete( '/:id', [
  validateJWT,
  check( 'id', 'Invalid id' ).isMongoId(),
  check( 'id' ).custom( hospitalIdValidation ),
  validateFields
], deleteHospital );

export default router;
