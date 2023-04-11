import express from "express";
import { GetUsers, Register, Login, Logout } from "../controllers/Users.js";
import { GetFilms, FindFilms, GetFilmById } from "../controllers/Films.js";
import { SetFilmReview, GetAllFilmReviews, GetAllUserReviews } from "../controllers/FilmsReviews.js";
import { SetRatingByUser, GetRatingByUser } from "../controllers/FilmRating.js";
import {
   GetUserWishlist,
   DeleteUserWishlist,
   SetUserWishlist,
   GetFilmInWishlist,
   DeleteWishlistByUser,
   GetUserAllWishlist
} from "../controllers/FilmsWishlist.js";
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
filmsRouter.get('/findfilms', FindFilms);
filmsRouter.get('/getfilm', GetFilmById);

const filmsWishlistRouter = express.Router();
filmsWishlistRouter.get('/filmWishlist', verifyToken, GetFilmInWishlist);
filmsWishlistRouter.get('/wishlist', verifyToken, GetUserWishlist);
filmsWishlistRouter.get('/deleteWishlist', verifyToken, DeleteUserWishlist);
filmsWishlistRouter.get('/deleteWishlistByUserId', verifyToken, DeleteWishlistByUser);
filmsWishlistRouter.get('/setWishlist', verifyToken, SetUserWishlist);
filmsWishlistRouter.get('/getUserWishlist', verifyToken, GetUserAllWishlist);

const filmReviewsRouter = express.Router();
filmReviewsRouter.get('/sendUserReview', verifyToken, SetFilmReview);
filmReviewsRouter.get('/getAllFilmReviews', GetAllFilmReviews);
filmReviewsRouter.get('/getAllUserReviews', GetAllUserReviews);

const filmRatingRouter = express.Router();
filmRatingRouter.get('/setFilmRating', verifyToken, SetRatingByUser);
filmRatingRouter.get('/getFilmRating', verifyToken, GetRatingByUser);


export { userRouter, forgotPasswordRouter, filmsRouter, filmsWishlistRouter, filmReviewsRouter, filmRatingRouter };