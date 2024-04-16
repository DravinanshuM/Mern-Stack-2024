import express from 'express';
const router = express.Router();

// Import userControllers.
import userControllers from '../controllers/usersControllers.js';

// Import middeleware for (Images).
import upload from '../middlewares/multerConfig/multerMiddleware.js';

// routing. 
router.get('/userexport', userControllers.userExport); 

router.get('/details',userControllers.getAllUsers); // For get All Doc. 
router.post('/register', upload.single('profile'), userControllers.createUsers); // for post All Doc. //upload.single('profile') for single upload and profile is a html name attribute inside value.
router.get('/:id', userControllers.getOneUsers); // For get Doc by Id.
router.delete('/:id', userControllers.deleteUser); // For Delete Document By Id.
router.put('/update/:id',upload.single('profile'), userControllers.updateUser); // For update the Document bY id.
router.put('/status/:id', userControllers.statusUpdate); // For status update.




export default router;