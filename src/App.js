import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component { 
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
   }

  // Search Github users
  searchUsers = async text => {
    this.setState({loading: true});
    let res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    res = res.data.items.filter(user=> user.login.includes(text) );

    this.setState({users: res, loading: false});
  }

  // Get single github user
  getUser = async (username) => {
    this.setState({loading: true});
    let res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({user: res.data, loading: false});
  }

  // Get user repos
  getUserRepos = async (username) => {
    this.setState({loading: true});
    let res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({repos: res.data, loading: false});
  }

  // Clear users from state
  clearUsers = () => this.setState({users: [], loading: false})

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => {
      this.setState({alert: null})
    }, 3000);
  }

  render(){
    const {users, loading, user, repos} = this.state;

    return (
      <Router>
      <div className="App">
        <Navbar title="Github Browser" icon="fab fa-github"/>
        <div className="container">
           <Alert alert={this.state.alert} />
           <Switch>
             <Route exact path='/' render={props => (
               <Fragment>
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length >0 ? true: false} setAlert={this.setAlert}/>
          <Users loading={loading} users = {users} />
        
               </Fragment>
             )} />
             <Route exact path="/about" component={About} />
             <Route exact path="/user/:login" render={props=>(
               <User {...props } getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading}/>
             )}/>
           </Switch>
          
        </div>
      </div>
      </Router>
    );
  }
   
}

export default App;
