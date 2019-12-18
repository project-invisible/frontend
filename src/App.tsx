import React from 'react';
import {Route, Router} from 'react-router-dom';
import Register from './register/Register';
import Login from './login/Login';
import { createBrowserHistory } from "history";
import HomeMap from './map/HomeMap';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
        <Route path="/login" component={() => <Login />} />
        <Route path="/register" component={() => <Register />} />
        <Route path="/" component={() => <HomeMap />} />
    </Router>
  );
}

export default App;
