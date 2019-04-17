import React from "react";
import HomePage from "./containers/HomePage";
import InstrumentPage from "./containers/InstrumentPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.pages = [HomePage, InstrumentPage];
    this.state = {
      activePage: 0,
      options: {}
    };
    this.goto = this.goto.bind(this);
  }
  goto(index, ob) {
    const options = ob || {};
    this.setState({activePage: index, options});
  }
  render() {
    const Page = this.pages[this.state.activePage];
    return (
      <Page goto={this.goto} {...this.state.options} />
    );
  }
}

export default App;
