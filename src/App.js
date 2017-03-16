import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import store, {history} from './store'

import MainComponent from './component/mainComponent'
import MainContainer from './container/mainContainer'
import ShowAllClassesContainer from './container/showAllClassesContainer'
import FacebookLogin from './component/facebookLogin'
import TestTextComponent from './component/testTextComponent'
import Calendar from './component/calendar/calendar'
import Login from './component/login'

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
                  <Route path="/" component={Login}>
                      <IndexRoute component={Calendar} />
                  </Route>
                  <Route path="/main" component={MainContainer}/>
              </Router>
          </Provider>
      );
  }
}

export default App;

