import LandingScreen from './screens/LandingScreen';
import DashboardScreen from './screens/DashboardScreen';
import {Route,Routes, Navigate, BrowserRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route exact path='/' element={<AlreadyLogin><LandingScreen></LandingScreen></AlreadyLogin>} />
              <Route path='/dashboard' element={<RequireAuth><DashboardScreen/></RequireAuth>}/>
          </Routes>
      </BrowserRouter>

  );
}

function RequireAuth({children}){
    const token = useSelector(state => state.user.token)
    return token===null ? <Navigate to="/"/> : children
}

function AlreadyLogin({children}){
    const token = useSelector(state => state.user.token)
    return token!==null ? <Navigate to="/dashboard"/> : children
}

export default App;
