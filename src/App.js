import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/githubState';
import AlertState from './context/alert/alertState';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';


const App = () => { 
  
     return (
      <GithubState>
        <AlertState>
      <Router>
      <div className="App">
        <Navbar title="Github Browser" icon="fab fa-github"/>
        <div className="container">
           <Alert />
           <Switch>
             <Route exact path='/' component={Home} />
             <Route exact path="/about" component={About} />
             <Route exact path="/user/:login" component={User} />
             <Route component={NotFound} />
           </Switch>
          
        </div>
      </div>
      </Router>
      </AlertState>
      </GithubState>
    );
   
}

export default App;
