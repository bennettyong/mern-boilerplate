import React, { Component } from 'react';
import {
  Router,
  Route,
  Redirect
} from 'react-router-dom';
import logo from './logo.svg';
import history from './history';
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router history={history}>
          <div>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
