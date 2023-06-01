import LandingScreen from './Screens/LandingScreen';
import DashboardScreen from './Screens/DashboardScreen';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={LandingScreen} />
        <Route path='/Dashboard' Component={DashboardScreen} />
      </Routes>
    </Router>
  );
}

export default App;
