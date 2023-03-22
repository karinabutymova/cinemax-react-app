import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import Page404 from './Page404';
import ProfilePage from './ProfilePage';
import SignPage from './SignPage';

const App = () => {

   return (
      <>
         <Router>
            <Routes>
               <Route exact path="/profile" element={<ProfilePage />} />
               <Route exact path="/auth" element={<LoginPage />} />
               <Route exact path="/sign" element={<SignPage />} />
               {/* <Route path="/book/:bookId" element={<BookPage />} /> */}
               <Route path="*" element={<Page404 />} status={404} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
