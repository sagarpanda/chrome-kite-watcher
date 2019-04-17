import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddForm extends Component {
  constructor(props) {
    super(props);
    const data = props.data || {};
    this.state = {
      name: data.name || '',
      price: data.price || ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleNameChange(e) {
    const name = e.target.value.toUpperCase();
    this.setState({name});
  }
  handlePriceChange(e) {
    const price = e.target.value;
    if (!isNaN(price)) {
      this.setState({price});
    }
  }
  handleClick() {
    const name = this.state.name.trim();
    const price = String(this.state.price).trim();
    if (name && price) {
      this.props.onSave({ name, price: parseFloat(price) });
    }
  }
  handleDeleteClick() {
    this.props.onDelete(this.state.name);
  }
  render() {
    const { name, price } = this.state;
    const disableNameField = (this.props.action === 'edit');
    return (
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Instrument Name</Form.Label>
          <Form.Control
            value={name}
            onChange={this.handleNameChange}
            type="text"
            placeholder="Eg. AXISBANK"
            maxLength="30"
            disabled={disableNameField}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Instrument Price</Form.Label>
          <Form.Control
            value={price}
            onChange={this.handlePriceChange}
            type="text"
            placeholder="Eg. 750"
            maxLength="6"
          />
        </Form.Group>
        <Button style={{marginTop: '1rem'}} variant="success" block onClick={this.handleClick}>
          Save
        </Button>
        {
          disableNameField &&
          <Button style={{marginTop: '1rem'}} variant="danger" block onClick={this.handleDeleteClick}>
            Delete
          </Button>
        }
      </Form>
    );
  }

}

export default AddForm;
