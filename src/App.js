import React from "react";
import Home from "./views/Home"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./componets/NavBar";

export default function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <NavBar/>
            <div className="container mx-auto">
                <Switch>
                    <Route path="/">
                        <Home component={Home}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}