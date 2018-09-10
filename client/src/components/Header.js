import React from 'react';
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Icon,
    Intent
} from "@blueprintjs/core";
import { AppToast } from "./AppToast";
import history from '../history';
import { IconNames } from "@blueprintjs/icons";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault()
    fetch('/api/logout',
      {
      method: 'POST',

      headers: {
        'Accept': 'application/json, text/plain,*',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      sessionStorage.removeItem('jwtToken')
      console.log(data)
      AppToast.show({ message: "Logged Out" ,
                              intent: Intent.SUCCESS,
                              icon : "log-out"});
      history.push('/');
    })
    .catch(err => {
      console.log("Already Logged out")
      AppToast.show({ message: "Already Logged Out" ,
                              intent: Intent.DANGER,
                              icon : "warning-sign"});
    })
  }



  render() {
   
    return (
      <div>
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
              <NavbarHeading>generator-mern</NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
              <NavbarDivider />
              <Button className={Classes.MINIMAL} onClick={()=>history.push("/")} icon="home" text="Home" />
              <Button className={Classes.MINIMAL} onClick={()=>history.push("/login")} icon="log-in" text="Login" />
              <Button className={Classes.MINIMAL} onClick={()=>history.push("/register")} icon="new-person" text="Register" />
              <Button className={Classes.MINIMAL} onClick={this.handleClick} icon="log-out" text="Logout" />
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}