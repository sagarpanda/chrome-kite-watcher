import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './Instruments.css';

class Instruments extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(item) {
    this.props.goto(1, { action: 'edit', data: {...item} });
  }
  render() {
    const list = this.props.list || [];
    return (
      <ListGroup className="Instruments">
        {
          this.props.list.map(item => (
            <ListGroup.Item key={item.name}>
              <span>{item.name}</span>
              <Badge onClick={() => this.handleClick(item)}>{item.price}</Badge>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    );
  }

}

export default Instruments;
