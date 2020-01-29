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
import AdminView from './admin/AdminView';
import UserView from './user/UserView';
import { useSelector } from 'react-redux';
import FeedbackView from './user/FeedbackView';

const history = createBrowserHistory();

function App() {
  const id: number = useSelector((state: any) => state.registerStore.id);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />        
        <Route path="/" component={() => <Navigationbar />} />
      </Switch>
        <Route exact path="/" component={() => <HomeMap />} />
        <Route exact path="/feedback" component={() => <FeedbackView />} />
        <Route exact path="/user" component={() => <UserView/>} />
        <Route exact path="/admin" component={() => <AdminView />} />
        <Route path="/codeofconduct" component={() => <CodeOfConduct />} />
        <Route path="/faq" component={() => <Faq />} />
        <Route path="/events" component={() => <Mapathon />} />
    </Router>
  );
}

export default App;
