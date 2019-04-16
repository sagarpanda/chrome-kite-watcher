import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Instruments from './Instruments';

class AppContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({searchText: value})
  }
  render() {
    const searchText = this.state.searchText.toUpperCase();
    const favStocks = this.props.favStocks.filter(item => item.name.indexOf(searchText) === -1 ? false : true);
    return (
      <Container>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Instrument..."
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={this.handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="scrollable">
          <Col>
            <Instruments list={favStocks} />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default AppContent;
