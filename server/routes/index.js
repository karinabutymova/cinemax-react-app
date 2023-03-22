import express from "express";
import { GetUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const userRouter = express.Router();
// всё что с пользователем через verifyToken
userRouter.get('/users', verifyToken, GetUsers);
userRouter.post('/users', Register);
userRouter.post('/login', Login);
userRouter.get('/token', refreshToken);
userRouter.delete('/logout', Logout);
 
export default userRouter;