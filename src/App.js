// Pages
import Register from './Pages/Register';
import Confirmation from './Pages/Confirmation';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import EditProfile from './Components/EditProfile';
import Header from './Components/Header';
import Home from './Pages/Home';

// CSS
import './Supports/Stylesheets/Utilities.css'

import { Routes, Route } from 'react-router-dom'

// Redux
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import allReducer from './Redux/Reducers/Index';
import LandingPage from './Pages/LandingPage';
import DetailPost from './Components/DetailPost';
import DetailProfile from './Components/DetailProfile';
import ResetPassword from './Pages/ResetPassword';
import LikedPage from './Pages/LikedPage';
import ForgotPassword from './Pages/ForgotPassword';

const store = createStore(allReducer, applyMiddleware(thunk))

function App() {
  return (
    <div>
      <Provider store={store}>
        <Header/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route exact path="/"  element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<LandingPage/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/likedpage" element={<LikedPage/>} />
          <Route path="/editprofile" element={<EditProfile/>} />
          <Route path="/confirmation/:token" element={<Confirmation />} />
          <Route path="/forgotpassword"  element={<ForgotPassword/>} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/detailpost/:id" element={<DetailPost />} />
          <Route path="/detailprofile/:id" element={<DetailProfile />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;