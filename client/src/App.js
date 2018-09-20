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
import {AuthProvider, AuthConsumer} from "react-check-auth";
import './App.css';

function LoggedIn(){
    tokenStillValid();
    if(!sessionStorage.getItem('jwtToken')) {
      return false
    }else{
      return true
    }
}

function tokenStillValid(){
    let token = sessionStorage.getItem('jwtToken');
    /* if(!token || token === "") {
      //if there is no token, dont bother
      return false;
    } */
    var data = {
      token : token
    }
    fetch("/api/user", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain,*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.success){
          sessionStorage.setItem('jwtToken', data.result.token);
        }
    })
    .catch(err => {
      console.log(err)
      return err
    })
  }


class App extends Component {
  constructor(props){
    super(props)

  }
  render() {
    return (
      <div className="App">
        <Header LoggedIn = {LoggedIn()}/>
        <Router history={history}>
          <div>
            <Route exact path="/" render={function(){
              if(LoggedIn()){
                return <Main/>
              }
                else{
                  return <Redirect to="/login"/>
                }
              }
              }/>
            {/* <Route exact path="/" component={Main}/> */}
            <Route exact path="/login" render={function(){
              if(LoggedIn()){
                return <Redirect to="/"/>
              }
                else{
                  return <Login/>
                }
              }
              }/>
            <Route exact path="/register" render={function(){
              if(LoggedIn()){
                return <Redirect to="/"/>
              }
                else{
                  return <Register/>
                }
              }
              }/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
