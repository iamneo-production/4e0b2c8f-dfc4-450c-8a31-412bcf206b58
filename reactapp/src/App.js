import LandingScreen from './screens/LandingScreen';
import DashboardScreen from './screens/DashboardScreen';
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
