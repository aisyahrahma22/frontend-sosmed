// Pages
import Register from './Pages/Register';
import Confirmation from './Pages/Confirmation';
import ConfirmationCode from './Pages/ConfirmationCode';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import EditProfile from './Components/EditProfile';
import Header from './Components/Header';
import Home from './Pages/Home';
import WaitingVerification from './Pages/WaitingVerification';

// CSS
import './Supports/Stylesheets/Utilities.css'

import { Routes, Route } from 'react-router-dom'

// Redux
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import allReducer from './Redux/Reducers/Index';
import ManagePosts from './Pages/ManagePosts';
import LandingPage from './Pages/LandingPage';

const store = createStore(allReducer, applyMiddleware(thunk))

function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route exact path="/"  element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<LandingPage/>} />
          <Route path="/manageposts" element={<ManagePosts/>} />
          <Route path="/waitingverification"  element={<WaitingVerification/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile/>} />
          <Route path="/manageposts" element={<ManagePosts />} />
          <Route path="/confirmation/:token" element={<Confirmation />} />
          <Route path="/confirmationcode/:id" element={<ConfirmationCode />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;