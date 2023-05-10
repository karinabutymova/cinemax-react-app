import express from "express";
import { GetUsers, Register, Login, Logout, DeleteUser } from "../controllers/Users.js";
import {
   GetFilms,
   FindFilms,
   GetFilmById,
   GetAllFilms,
   DeleteFilmById,
   AddFilm,
   GetFilmTitles,
   GetPopularFilm
} from "../controllers/Films.js";
import { SetFilmReview, GetAllFilmReviews, GetAllUserReviews } from "../controllers/FilmsReviews.js";
import { SetRatingByUser, GetRatingByUser, GetAllRatingByUser } from "../controllers/FilmRating.js";
import {
   GetUserWishlist,
   DeleteUserWishlist,
   SetUserWishlist,
   GetFilmInWishlist,
   DeleteWishlistByUser,
   GetUserAllWishlist
} from "../controllers/FilmsWishlist.js";
import { GetUserBonuses, SetUserBonus } from "../controllers/UserBonuses.js";
import { SetNewSeats } from "../controllers/Seats.js";
import { FindNews, GetLastNews } from "../controllers/News.js";
import { GetUnavailableSeats, SetNewTickets, GetUserTicketsCount, GetUserShowTickets } from "../controllers/Tickets.js";
import { GetAllFilmShows, GetShowHalls, GetAllFilmsShowsAdmin, DeleteFilmShowById } from "../controllers/FilmsShows.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { SendEmail, resetPassword, changePassword } from "../controllers/RessetPassword.js";
import { SetOrder } from "../controllers/Orders.js";
import { GetAllHallsTitles } from "../controllers/Halls.js";


const userRouter = express.Router();
// всё что с пользователем через verifyToken
userRouter.get('/users', verifyToken, GetUsers);
userRouter.get('/deleteUser', verifyToken, DeleteUser);
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
filmsRouter.get('/getFilmTitles', GetFilmTitles);
filmsRouter.get('/deleteFilm', DeleteFilmById);
filmsRouter.get('/findfilms', FindFilms);
filmsRouter.get('/getfilm', GetFilmById);
filmsRouter.get('/films', verifyToken, GetAllFilms);
filmsRouter.post('/addFilm', AddFilm);
filmsRouter.get('/getPopularFilm', GetPopularFilm);

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
filmRatingRouter.get('/getUserRating', verifyToken, GetAllRatingByUser);

const newsRouter = express.Router();
newsRouter.get('/findNews', FindNews);
newsRouter.get('/getLastNews', GetLastNews);

const filmsShowsRouter = express.Router();
filmsShowsRouter.get('/getAllFilmShows', GetAllFilmShows);
filmsShowsRouter.get('/getShowHalls', GetShowHalls);
filmsShowsRouter.get('/getAllFilmsShows', GetAllFilmsShowsAdmin);
filmsShowsRouter.get('/deleteFilmShow', verifyToken, DeleteFilmShowById);

const ticketsRouter = express.Router();
ticketsRouter.get('/getUnavailableSeats', GetUnavailableSeats);
ticketsRouter.get('/setNewTickets', SetNewTickets);
ticketsRouter.get('/getUserTicketsCount', GetUserTicketsCount);
ticketsRouter.get('/getUserShowTickets', GetUserShowTickets);

const userBonusesRouter = express.Router();
userBonusesRouter.get('/getUserBonuses', GetUserBonuses);
userBonusesRouter.post('/setUserBonus', SetUserBonus);

const seatsRouter = express.Router();
seatsRouter.get('/setNewSeats', SetNewSeats);

const orderRouter = express.Router();
orderRouter.post('/setOrder', SetOrder);

const hallRouter = express.Router();
hallRouter.get('/getHallsTitles', GetAllHallsTitles);

export {
   userRouter,
   forgotPasswordRouter,
   filmsRouter,
   filmsWishlistRouter,
   filmReviewsRouter,
   filmRatingRouter,
   newsRouter,
   filmsShowsRouter,
   ticketsRouter,
   userBonusesRouter,
   seatsRouter,
   orderRouter,
   hallRouter
};