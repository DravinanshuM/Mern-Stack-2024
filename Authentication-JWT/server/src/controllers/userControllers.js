import userModels from '../models/userModels.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import nodeMailer from 'nodemailer';

const secretKey = config.SecretKey;
const NodeEmail = config.NodeMailerEmail;
const NodePassword = config.NodeMailerPassword;

// NodeMailer Configuration.
const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: NodeEmail,
        pass: NodePassword
    }
})

// For Registration API.
const createUser = async (req, res, next) => {
    // console.log("req.body :: ", req.body);
    const { name, email, password, cpassword } = req.body;
              
    if (!name || !email || !password || !cpassword) {
        return next(createHttpError(400, "All fields are required"));
    }

    try {
        // Check if email already exists
        const emailExists = await userModels.findOne({ email });
        if (emailExists) {
            return next(createHttpError(422, "This email is already taken by user."));
        }

        // Check if password and confirm password match
        if (password !== cpassword) {
            return next(createHttpError(422, "Password and confirm password do not match"));
        }

        // Create a new user
        const newUser = new userModels({ name, email, password, cpassword });
        const storedData = await newUser.save();

        // Respond with the stored user data
        res.status(201).json(storedData);

    } catch (error) {
        return next(createHttpError(500, error.message)); 
    }
}

// For Login API.
const userLogin = async (req, res, next) => {
    // console.log("server-side:: ", req.body);

    const { email, password } = req.body;

    try {
        // Check if both email and password are provided
        if (!email || !password) {
            throw createHttpError(400, "Email and password are required.");
        }

        // Find user by email
        const userValid = await userModels.findOne({ email: email });

        // If user is not found
        if (!userValid) {
            throw createHttpError(422, "Invalid user email.");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, userValid.password);

        // If passwords do not match
        if (!isMatch) {
            throw createHttpError(422, "Invalid user password.");
        }

        // Generate Token.
        const token = await userValid.generateAuthtoken(); // this function inside in user model.

        // console.log(token);

        // Now set Cookie.
        res.cookie("userCookie", token, {
            expires: new Date(Date.now()+9000000),
            httpOnly: true
        })

        const result = {
            userValid,
            token
        }

        res.status(201).json({ status: 201, result});

        // console.log(result);

    } catch (error) {
        // Pass any caught error to the error handling middleware
        next(error);
    }
};

// For user Authentication login time pr.
const userAuthentication = async (req, res, next) => {
     try {
        const validUserOne = await userModels.findOne({_id:req.userId});
        // console.log(validUserOne);
        
        res.status(201).json({ status: 201, validUserOne });
     } catch (error) {
        return next(createHttpError(401, error));
     }
};

// For user Logout.
const userLogout = async (req, res, next) => {
    // console.log("userLogOut called");
    try {
        req.userRoot.tokens =  req.userRoot.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        // console.log(req.userRoot.tokens);

        res.clearCookie("usercookie",{path:"/"});

        req.userRoot.save();

        res.status(201).json({status:201})

    } catch (error) {
        return next(createHttpError(500, error));
    }
}

// For userResetPassword.
const userResetPassword = async (req, res, next) => {
     // console.log("server-side :: ", req.body);
    // res.status(201).json({message: "OK"});
  const { email } = req.body;

  if(!email) {
    return next(createHttpError(401, { message: "Please enter your email.", status: 401 }));
  }

  try {
    // find Email.
    const userValid = await userModels.findOne({ email: email });
    if(!userValid) {
        return next(createHttpError(401, { message: "This Email is Not Registered.", status: 401 }));
    }

    // Generate Token.
    const token = jwt.sign({ _id:userValid._id }, secretKey, { expiresIn: "120s" });


    // Store generated Token into MongoDB.
    const setuserToken = await userModels.findByIdAndUpdate({_id:userValid._id}, { varifiedToken: token }, {new:true});

    // console.log("store token into data base :: ", setuserToken);

    if(setuserToken) {
        // const mailOptions = {
        //     from: "tjdravinanshu@gmail.com",
        //     to: email,
        //     subject: "Sending Email For password Reset",
        //     text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userValid.id}/${setuserToken.varifiedToken}`
        // }
        const mailOptions = {
            from: NodeEmail,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the button below to reset your password:</p>
                    <p style="text-align: center; margin-top: 20px;">
                        <a href="http://localhost:3000/forgotpassword/${userValid.id}/${setuserToken.varifiedToken}"
                           style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                            Reset Password
                        </a>
                    </p>
                    <p style="margin-top: 20px;">This link will expire in 2 minutes for security reasons.</p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                    <p>Regards,<br>Dravinanshu Mishra's App Team</p>
                </body>
                </html>
            `
        };
        

        // console.log(mailOptions);

        transporter.sendMail(mailOptions, (error, info)=>{
            if(error) {
                console.log("error",error);
                next(createHttpError(401, { message: "email not send", status:401 }));
            } else {
                console.log("Email sent",info.response);
                res.status(201).json({status:201,message:"Email sent Succsfully"})
            }
        })
    }
    
  } catch (error) {
    
  }
  
}

// For verified user forGot password verified.
const userForgotPassword = async (req, res, next) => {
    const { id, token } = req.params;

    try {
        // Find the user by _id and varifiedToken
        const user = await userModels.findOne({ _id: id, varifiedToken: token });

        // If user is not found, return an error
        if (!user) {
            return res.status(401).json({ error: "User not verified" });
        }

        // verified token.
        const verifiedToken = jwt.verify(token, secretKey);

        if(user && verifiedToken._id) {
            return res.status(200).json({ status: 200, user });
        } else {
            return next(createHttpError(401, {status:401, message: "user not verified"}));
        }
        
    } catch (error) {
        // Handle database or other internal errors
        return next(createHttpError(500, "Internal Server Error"));
    }
}

// For user Update Password.
const userUpdatePassword = async (req, res, next) => {
    const { id, token } = req.params;
    const { newpassword, cnewpassword } = req.body;
    // console.log(id);
    // console.log(token);
    // console.log(newpassword, cnewpassword);

    try {
         // Find the user by _id and varifiedToken
         const user = await userModels.findOne({ _id: id, varifiedToken: token });

         // If user is not found, return an error
         if (!user) {
             return res.status(401).json({ error: "User not verified" });
         }
 
         // verified token.
         const verifiedToken = jwt.verify(token, secretKey);
 
         if(user && verifiedToken._id) {
            //  return res.status(200).json({ status: 200, user });
            if(!newpassword || !cnewpassword) {
                return next(createHttpError(401, "All fileds are required"));
            }
            if (newpassword !== cnewpassword) {
                return next(createHttpError(422, "New password and Confirm new password do not match"));
            }  
            const hashedNewPassword = await bcrypt.hash(newpassword, 12);  
            const hashedConfirmNewPassword = await bcrypt.hash(cnewpassword, 12);  
            const updatedUser = await userModels.findByIdAndUpdate(id, { password: hashedNewPassword, cpassword:hashedConfirmNewPassword });

            if (!updatedUser) {
                return next(createHttpError(404, "User not found"));
            }
    
            res.status(200).json({ status: 200, message: "Password updated successfully" });

         } else {
             return next(createHttpError(401, {status:401, message: "user not verified"}));
         }
        
    } catch (error) {
        return next(createHttpError(500, error.message || "Internal server error"));
    }
};



export { createUser, userLogin, userAuthentication, userLogout, userResetPassword, userForgotPassword, userUpdatePassword };
