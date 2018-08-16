import React from 'react';
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Icon
} from "@blueprintjs/core";
import history from '../history';
import { IconNames } from "@blueprintjs/icons";

export default class Header extends React.Component {

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
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}