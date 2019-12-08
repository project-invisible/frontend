import React from 'react';
import {Route, Router} from 'react-router-dom';
import Register from './register/Register.tsx';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
        <Route path="/register" component={() => <Register />} />
    </Router>
  );
}

export default App;
