import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class FooterButton extends Component {
  constructor(props) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
  }
  handlerClick() {
    const { favStocks, isShowBasePrice: isShow } = this.props;
    const isShowBasePrice = !isShow;
    this.props.showBasePrice(isShowBasePrice);
  }
  render() {
    let label = 'Show Base Prices in Marketwatch',
        variant = 'success';
    if (this.props.isShowBasePrice) {
      label = 'Hide Base Prices';
      variant = 'warning'
    }
    return (
      <div>
        <Button style={{marginTop: '1rem'}} variant={variant} block onClick={this.handlerClick}>
          {label}
        </Button>
      </div>
    );
  }

}

export default FooterButton;
