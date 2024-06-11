import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
  createDoctor,
  deleteDoctor,
  getDoctor,
  getDoctors,
  updateDoctor
} from '../controllers/doctors';
// Helpers
import { doctorIdValidation, hospitalIdValidation } from '../helpers/db';
// Middlewares
import { validateFields, validateJWT } from '../middlewares';

/*
  PATH: '/api/doctors'
*/
const router: Router = Router();

router.post( '/', [
  validateJWT,
  check( 'name', 'Name is required' ).not().isEmpty(),
  check( 'hospital', 'Hospital is required' ).not().isEmpty(),
  check( 'hospital' ).custom( hospitalIdValidation ),
  validateFields
], createDoctor );

router.get( '/', [
  validateJWT,
  validateFields
], getDoctors );

router.get( '/:id', [
  validateJWT,
  check( 'id', 'Invalid mongo Id' ).isMongoId(),
  check( 'id' ).custom( doctorIdValidation ),
  validateFields
], getDoctor );

router.put( '/:id', [
  validateJWT,
  check( 'name', 'name is required' ).not().isEmpty(),
  check( 'hospital', 'Hospital is required' ).not().isEmpty(),
  check( 'hospital' ).custom( hospitalIdValidation ),
  check( 'id', 'Invalid mongo Id' ).isMongoId(),
  check( 'id' ).custom( doctorIdValidation ),
  validateFields
], updateDoctor );

router.delete( '/:id', [
  validateJWT,
  check( 'id', 'Invalid mongo Id' ).isMongoId(),
  check( 'id' ).custom( doctorIdValidation ),
  validateFields
], deleteDoctor );

export default router;
