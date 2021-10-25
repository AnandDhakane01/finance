import Index from "./pages/Index";
import NavBar from "./components/Index/NavBar";
import Quote from "./pages/Quote";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
} from "react-router-dom";

function App() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path="/quote" component={withRouter(Quote)} />
                    <Route exact path="/" component={withRouter(Index)} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
