/*jslint es6, white, devel */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/HomePage/home';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route />
            <Switch>
              <Route exact path={'/'} component={Home} />
              <Route path={'/login'} component={LoginForm} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
render(<App />, document.getElementById('root'));
