import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import AddForm from './../components/AddForm';
import {
  addInstrument,
  updateInstrument,
  deleteInstrument
} from './../actions/favStocksAction';

class AddInstrumentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      showError: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }
  isDuplicate(ob) {
    const filtered = this.props.favStocks.filter(item => item.name === ob.name);
    return filtered.length > 0;
  }
  handleClick() {
    this.props.goto(0);
  }
  handleSave(ob) {
    if (this.props.action === 'add') {
      if (!this.isDuplicate(ob)) {
        this.props.addInstrument(ob);
        this.props.goto(0);
      } else {
        this.setState({errorMsg: `${ob.name} already exist`, showError: true});
      }
    } else {
      this.props.updateInstrument(ob);
      this.props.goto(0);
    }
  }
  handleDelete(name) {
    this.props.deleteInstrument(name);
    this.props.goto(0);
  }
  handleDismiss() {
    this.setState({errorMsg: '', showError: false});
  }
  render() {
    const { action, data } = this.props;
    const titles = { edit: 'Edit', add: 'Add' };
    return (
      <div>
        <Navbar>
          <Form inline>
            <Button onClick={this.handleClick} variant="outline-info">&lt; Back</Button>
          </Form>
          <Navbar.Brand style={{flex: 1}}>&nbsp; {titles[action]} Instrument</Navbar.Brand>
        </Navbar>
        <Container>
          {
              this.state.showError &&
              <Alert variant="danger" onClose={this.handleDismiss} dismissible>
                {this.state.errorMsg}
              </Alert>
          }
          <Row className="scrollable">
            <Col>
              <AddForm
                action={action}
                data={data}
                onSave={this.handleSave}
                onDelete={this.handleDelete}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    favStocks: state.favStocks
  }
}

const mapDispatchToProps = { addInstrument, updateInstrument, deleteInstrument };

export default connect(mapStateToProps, mapDispatchToProps)(AddInstrumentPage);
