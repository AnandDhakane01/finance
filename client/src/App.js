import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Quote from "./pages/Quote";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Router>
        <NavBar />
        <Switch>
          {/* Private Routes*/}
          <PrivateRoute exact path="/" component={Index} />
          <PrivateRoute exact path="/quote" component={Quote} />
          <PrivateRoute exact path="/buy" component={Buy} />
          <PrivateRoute exact path="/sell" component={Sell} />

          {/* Restricted Routes */}
          <Route exact path="/login" component={withRouter(Login)} />
          <Route exact path="/register" component={withRouter(Register)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
