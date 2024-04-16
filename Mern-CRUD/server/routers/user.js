import express from 'express';

// import user Controllers.
import UserControllers from '../controllers/userControllers.js';

const router = express.Router();

// first, define pagination route.
router.get('/pagination', UserControllers.paginationDoc); // for pagination API.

// second, define get single document route.
router.get('/:id', UserControllers.getOneDoc); // Get a single document based on ID.

// Other routes remain unchanged
router.get('/', UserControllers.getAllDoc); // Get all data from the database.
router.post('/', UserControllers.createDoc); // Create new data and store in the database.
router.delete('/:id', UserControllers.deleteDoc); // Delete the document based on ID.
router.put('/:id', UserControllers.updateDoc); // Update the document based on ID.


export default router;