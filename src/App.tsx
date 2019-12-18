import React from 'react';
import {Route, Router} from 'react-router-dom';
import Register from './register/Register.tsx';
import Homepage from './homepage/Homepage.tsx';
import { createBrowserHistory } from "history";
import HomeMap from './map/Map.tsx';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
        <Route path="/register" component={() => <Register />} />
        <Route path="/home" component={() => <HomeMap />} />
    </Router>
  );
}

export default App;
