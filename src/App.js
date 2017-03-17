import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import store, {history} from './store'

import MainContainer from './container/mainContainer'
import Login from './component/login'
import HomePage from './component/homePage'

//Import CSS
require("style-loader!css-loader!./css/header.css");
require("style-loader!css-loader!./css/body.css");
require("style-loader!css-loader!./css/navSideBar.css");
require("style-loader!css-loader!./css/pagePanel.css");
require("style-loader!css-loader!./css/footer.css");
require("style-loader!css-loader!./css/calendar.css");
require("style-loader!css-loader!./css/loginForm.css");
// require("style-loader!css-loader!./css/googleForm.css");

//Import JS
// require("style-loader!./js/googleForm");

class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <Router history={history}>
                  <Route path="/" component={HomePage}>
                      <IndexRoute component={Login}> </IndexRoute>
                      <Route path="main" component={MainContainer}/>

                  </Route>
              </Router>
          </Provider>
      );
  }
}

export default App;

