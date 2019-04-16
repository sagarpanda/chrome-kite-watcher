import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Header extends Component {

  render() {
    return (
      <Navbar>
        <Navbar.Brand style={{flex: 1}}>Kite Watcher</Navbar.Brand>
        <Form inline>
          <Button variant="outline-info">+</Button>
        </Form>
      </Navbar>
    );
  }

}

export default Header;
