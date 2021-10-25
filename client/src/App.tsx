import Index from "./pages/Index";
import NavBar from "./components/Index/NavBar";
import Quote from "./pages/Quote";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
