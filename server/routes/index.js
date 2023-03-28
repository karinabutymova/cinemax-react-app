import express from "express";
import { GetUsers, Register, Login, Logout } from "../controllers/Users.js";
import { GetFilms } from "../controllers/Films.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { SendEmail, resetPassword, changePassword } from "../controllers/RessetPassword.js";


const userRouter = express.Router();
// всё что с пользователем через verifyToken
userRouter.get('/users', verifyToken, GetUsers);
userRouter.post('/users', Register);
userRouter.post('/login', Login);
userRouter.get('/token', refreshToken);
userRouter.delete('/logout', Logout);

const forgotPasswordRouter = express.Router();
forgotPasswordRouter.post('/forgotPassword', SendEmail);
forgotPasswordRouter.get('/resetPassword', resetPassword);
forgotPasswordRouter.put('/changePassword', changePassword);


const filmsRouter = express.Router();
filmsRouter.get('/posters', GetFilms);

export {userRouter, forgotPasswordRouter, filmsRouter};