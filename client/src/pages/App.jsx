import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmailSend from './EmailSendPage';
import ForgotPassword from './ForgotPassword';
import LoginPage from './LoginPage';
import Page404 from './Page404';
import PosterPage from './PosterPage';
import ProfilePage from './ProfilePage';
import ResetPassword from './ResetPassword';
import SignPage from './SignPage';


const App = () => {

   return (
      <>
         <Router>
            <Routes>
               <Route exact path="/profile" element={<ProfilePage />} />
               <Route exact path="/poster" element={<PosterPage />} />
               <Route exact path="/auth" element={<LoginPage />} />
               <Route exact path="/sign" element={<SignPage />} />
               <Route exact path="/forgotpassword" element={<ForgotPassword />} />
               <Route exact path="/resetPassword/:token" element={<ResetPassword />} />
               <Route exact path="/emailsend" element={<EmailSend />} />
               <Route path="*" element={<Page404 />} status={404} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
