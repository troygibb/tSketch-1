import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import reducer from './reducers/index';

import Layout from './Layout';
import Home from './Home';
import PickBackgroundImage from './PickBackgroundImage';
import Draw from './Draw';
import Message from './Message';
import ConfirmPage from './ConfirmPage';
import Success from './Success';
import Gallery from './Gallery';
import GallerySingle from './GallerySingle';

const finalStore = applyMiddleware(thunk)(createStore);
const store = finalStore(reducer);

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={Layout}>
              <IndexRoute component={Home} />
              <Route path="/pickBackgroundImage" component={PickBackgroundImage} />
              <Route path="/draw" component={Draw} />
              <Route path="/message" component={Message} />
              <Route path="/confirm" component={ConfirmPage} />
              <Route path="/doodle-success" component={Success} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/gallery/:orderId" component={GallerySingle} />
            </Route>
          </Router>
        </Provider>
      </div>
    );
  }
}
/* global document */
ReactDOM.render(<App />, document.getElementById('main'));

// Enables HMR.
if (module.hot) {
  module.hot.accept();
}
