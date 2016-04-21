'use strict';

// React Native Components
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

// Router-Flux
import RNRF, {
    Router,
    Scene
} from 'react-native-router-flux';

// Redux
import {Provider, connect} from 'react-redux';

// configureStore
import configureStore from './configureStore';

// Containers
import Main from './containers/Main'
import CountryList from './containers/CountryList'

class ReactNativeDemo extends Component {
    render(){
      // Create Store with Reducers and other middleware
      const store = configureStore();
      const Router = connect()(RNRF.Router);

      return (
          <Provider store={store}>
              <Router hideNavBar={true}>
                  <Scene key="root">
                      <Scene key="countryList"
                             component={CountryList}
                             title="Countries"/>
                      <Scene key="main"
                             initial={true}
                             component={Main}
                             title="ReactNativeDemo"/>
                  </Scene>
              </Router>
          </Provider>
      );
    }
}

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
