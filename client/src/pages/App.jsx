import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactNotifications, Store } from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";
import EmailSend from './EmailSendPage';
import ForgotPassword from './ForgotPassword';
import LoginPage from './LoginPage';
import Page404 from './Page404';
import PosterPage from './PosterPage';
import ProfilePage from './ProfilePage';
import ResetPassword from './ResetPassword';
import SignPage from './SignPage';
import SearchPage from './SearchPage';
import FilmPage from './FilmPage';
import AdminPage from './AdminPage';
import MainPage from "./MainPage";
import NewsPage from './NewsPage';
import SingleNewsPage from './SingleNewsPage';
import HelpPage from './HelpPage';
import AboutPage from './AboutPage';

const App = () => {

   return (
      <>
         <ReactNotifications />
         <Router>
            <Routes>
               <Route exact path="/" element={<MainPage />} />
               <Route exact path="/profile" element={<ProfilePage />} />
               <Route exact path="/poster" element={<PosterPage />} />
               <Route exact path="/auth" element={<LoginPage />} />
               <Route exact path="/sign" element={<SignPage />} />
               <Route exact path="/search" element={<SearchPage />} />
               <Route exact path="/film/:filmId" element={<FilmPage />} />
               <Route exact path="/forgotpassword" element={<ForgotPassword />} />
               <Route exact path="/resetPassword/:token" element={<ResetPassword />} />
               <Route exact path="/adminPanel" element={<AdminPage />} />
               <Route exact path="/emailsend" element={<EmailSend />} />
               <Route exact path="/news" element={<NewsPage />} />
               <Route exact path="/help" element={<HelpPage />} />
               <Route exact path="/about" element={<AboutPage />} />
               <Route exact path="/news/:newsId" element={<SingleNewsPage />} />
               <Route path="*" element={<Page404 />} status={404} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
