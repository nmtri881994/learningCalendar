import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import store, {history} from './store'

import MainComponent from './component/mainComponent'
import ShowAllClassesContainer from './container/showAllClassesContainer'
import FacebookLogin from './component/facebookLogin'
import TestTextComponent from './component/testTextComponent'

//Import Css
require("style-loader!css-loader!./css/header.css");
require("style-loader!css-loader!./css/body.css");
require("style-loader!css-loader!./css/navSideBar.css");
require("style-loader!css-loader!./css/pagePanel.css");
require("style-loader!css-loader!./css/footer.css");
require("style-loader!css-loader!./css/calendar.css");

class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <Router history={history}>
                  <Route path="/" component={MainComponent}>
                      <IndexRoute component={TestTextComponent} />
                      <Route path="/facebook" component={FacebookLogin}/>
                  </Route>
              </Router>
          </Provider>
      );
  }
}

export default App;

