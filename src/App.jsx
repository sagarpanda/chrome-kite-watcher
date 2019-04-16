import React from "react";
import { connect } from 'react-redux'
import Header from "./components/Header";
import AppContent from './components/AppContent';
import FooterButton from './components/FooterButton';
import {
  addNewStock,
  showBasePrice
} from './actions/favStocksAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AppContent favStocks={this.props.favStocks} />
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

const mapDispatchToProps = { addNewStock, showBasePrice };

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
