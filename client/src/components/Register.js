import React, { Component } from 'react';
import { FormGroup, H5, InputGroup, Intent, Switch, Button } from "@blueprintjs/core";
import { AppToast } from "./AppToast";

class Register extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      user:{
        username: "",
        password:"",
        email:"",
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target
    var user = {...this.state.user}
    user[name] = value;
    this.setState({user})
  }

  handleSubmit(event) {
    var data = this.state.user
    fetch('/api/user/create',
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain,*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if(data.result === "success"){
        AppToast.show({ message: "Success",
                        intent: Intent.SUCCESS,
                        icon : "thumbs-up"});
      }else{
        console.log(data)
        for (var i in data) {
          AppToast.show({ message: data[i].msg,
                        intent: Intent.DANGER,
                        icon : "ban-circle"});
        } 
      }
    })
    .catch(err =>
      console.log(err)
    ) 
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <div></div>
        <form onSubmit={this.handleSubmit}>
          <label>
          Username:
          <input type="text" name='username'value={this.state.user.username} onChange={this.handleChange} />
          </label><br/>
          <label>
          Email:
          <input type="email" name='email'value={this.state.user.email} onChange={this.handleChange} />
          </label><br/>
          <label>
          Password:
          <input type="text" name='password'value={this.state.user.password} onChange={this.handleChange} />
          </label><br/>
          <label>
          Re-enter Password:
          <input type="text" name='repassword' value={this.state.user.repassword} onChange={this.handleChange} />
          </label><br/>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}


export default Register;