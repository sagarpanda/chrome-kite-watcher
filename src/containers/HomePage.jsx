import React from "react";
import { connect } from 'react-redux';
import Header from "./../components/Header";
import AppContent from './../components/AppContent';
import FooterButton from './../components/FooterButton';
import {
  showBasePrice
} from './../actions/favStocksAction';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header goto={this.props.goto} />
        <AppContent
          goto={this.props.goto}
          favStocks={this.props.favStocks}
        />
        <FooterButton
          favStocks={this.props.favStocks}
          isShowBasePrice={this.props.isShowBasePrice}
          showBasePrice={this.props.showBasePrice}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favStocks: state.favStocks,
    isShowBasePrice: state.isShowBasePrice
  }
}

const mapDispatchToProps = { showBasePrice };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
