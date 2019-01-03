import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <Routes/>
        </Router>
      </Provider>
    );
  }
}

export default App;
