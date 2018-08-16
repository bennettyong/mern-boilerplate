import React, { Component } from 'react';
import { FormGroup, H5, InputGroup, Intent, Switch, Button } from "@blueprintjs/core";
import { AppToast } from "./AppToast";


class Login extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      user:{
      password:"",
      email:""
    },
      outcome:undefined
  }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target
    var user = {...this.state.user}
    user[name] = value;
    this.setState({user})

    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = this.state.user
    /* this.props.login(data) */

    fetch('/api/login',
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
        if(data.result){
          this.setState({
            outcome:true
          })
          AppToast.show({ message: "Success" ,
                              intent: Intent.SUCCESS,
                              icon : "tick"});
        }else{
          AppToast.show({ message: "Wrong password" ,
                                intent: Intent.DANGER,
                                icon : "ban-circle"});
        }
    })
    .catch(err => {
      AppToast.show({ message: "Invalid Login Information" ,
                          intent: Intent.DANGER,
                          icon : "ban-circle"
      });
      console.log(err)
    })

  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <FormGroup
                    /* helperText={"Helper text with details..."} */
                    inline={true}
                    intent="primary"
                    label="Email"
                    labelFor="email"
                    labelInfo={"(required)"}
                >   
                    <InputGroup id="email" name='email' type="text" placeholder="Email" intent="primary" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup
                    /* helperText={"Helper text with details..."} */
                    inline={true}
                    intent="primary"
                    label="Password"
                    labelFor="password"
                    labelInfo={"(required)"}
                >
                    <InputGroup id="password" name='password' type="password" placeholder="Password" intent="primary" onChange={this.handleChange}/>
        </FormGroup>
        <Button icon="log-in" text="Login" onClick={this.handleSubmit}/>
        {/* <form onSubmit={this.handleSubmit}>
          <label>
          Email:
          <input type="email" name='email'value={this.state.user.email} onChange={this.handleChange} />
          </label><br/>
          <label>
          Password:
          <input type="text" name='password'value={this.state.user.password} onChange={this.handleChange} />
          </label><br/>
        <input type="submit" value="Submit" />
      </form> */}
      </div>
    );
  }
}

export default Login;