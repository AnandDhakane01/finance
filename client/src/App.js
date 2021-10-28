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

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={withRouter(Index)} />
          <Route exact path="/quote" component={withRouter(Quote)} />
          <Route exact path="/buy" component={withRouter(Buy)} />
          <Route exact path="/sell" component={withRouter(Sell)} />
          <Route exact path="/login" component={withRouter(Login)} />
          <Route exact path="/register" component={withRouter(Register)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
