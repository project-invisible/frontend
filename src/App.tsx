import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import Register from './register/Register';
import Login from './login/Login';
import { createBrowserHistory } from "history";
import HomeMap from './map/HomeMap';
import CodeOfConduct from './codeOfConduct/CodeOfConduct';
import Navigationbar from './navigationbar/Navigationbar';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
      <Route exact path="/login" component={() => <div />} />
      <Route path="/register" component={() => <Register />} />        
      <Route path="/" component={() => <Navigationbar />} />
      </Switch>
        <Route path="/login" component={() => <Login />} />
        <Route path="/register" component={() => <Register />} />
        <Route exact path="/" component={() => <HomeMap />} />
        <Route path="/codeofconduct" component={() => <CodeOfConduct />} />
    </Router>
  );
}

export default App;
