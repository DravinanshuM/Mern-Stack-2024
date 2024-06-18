import express from 'express';
import { createUser, userLogin, userAuthentication, userLogout, userResetPassword, userForgotPassword, userUpdatePassword } from '../controllers/userControllers.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

// For user Router.
router.get('/get', (req, res)=> {
    res.send("get Users records");
});

// For users registartion API Routes.
router.post('/registration',createUser);  // For Registration user.

// For user Login API.
router.post('/login', userLogin);

// For user Authentication Login time.
router.get('/validUser', userAuth, userAuthentication);

// For userLogout.
router.get('/userlogout',userAuth, userLogout);

// For userReset Password.
router.post("/sendpasswordlink", userResetPassword);

// For verified forGot password user.
router.get("/forgotpassword/:id/:token", userForgotPassword);

// For Update The password.
router.post('/updatepassword/:id/:token', userUpdatePassword);

export default router;