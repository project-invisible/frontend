import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import Register from './register/Register';
import Login from './login/Login';
import { createBrowserHistory } from "history";
import HomeMap from './map/HomeMap';
import CodeOfConduct from './staticContent/CodeOfConduct';
import Navigationbar from './navigationbar/Navigationbar';
import Faq from './staticContent/Faq';
import Mapathon from './staticContent/Mapathon';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />        
        <Route path="/" component={() => <Navigationbar />} />
      </Switch>
        <Route exact path="/" component={() => <HomeMap />} />
        <Route path="/codeofconduct" component={() => <CodeOfConduct />} />
        <Route path="/faq" component={() => <Faq />} />
        <Route path="/events" component={() => <Mapathon />} />
    </Router>
  );
}

export default App;
