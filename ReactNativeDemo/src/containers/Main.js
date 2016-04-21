'use strict';

// Router-Flux
import {Actions} from 'react-native-router-flux';

// ReactNative Components
import React, {
  Component,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Platform,
  ToolbarAndroid,
  View
} from 'react-native'
import NavigationBar from 'react-native-navbar';
import Button from 'react-native-button';

export default class Main extends Component {
  _onActionSelected () {
    alert('Click Settings');
  }

  render() {
     var TouchableElement = Button;
     var HeaderBar = NavigationBar;
     var headerProps = {
       title: {
         title: 'ReactNativeDemo'
       },
       rightButton: {
         title: 'Settings',
         handler: this._onActionSelected
       }
     };
     if(Platform.OS === 'android'){
       TouchableElement = TouchableNativeFeedback;
       HeaderBar = ToolbarAndroid;
       headerProps = {
         title: 'ReactNativeDemo',
         titleColor: '#FFFFFF',
         style: {
           height:56,
           backgroundColor: '#3F51B5'
         },
         actions : [
           {
             title: 'Settings',
             show: 'always'
           }
         ],
         onActionSelected: this._onActionSelected
       };
     }
      return (
        <View style={{flex: 1}}>
          <HeaderBar
            {...headerProps} />
            <View style={styles.container}>
              <TouchableElement onPress={Actions.countryList}>
                <View>
                  <Text style={styles.button}>Hello, ReactNative</Text>
                </View>
              </TouchableElement>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    fontSize: 20
  }
});