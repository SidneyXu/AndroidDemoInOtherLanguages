// ReactNative Components
import React, {
   Component,
   StyleSheet,
   Text,
   View,
   TouchableNativeFeedback,
   Platform
 } from "react-native";
 import Button from 'react-native-button';

export default class Item extends Component {
    render() {
        var TouchableElement = Button;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        const {onItemClick, country} = this.props;
        return (
            <TouchableElement onPress={()=>onItemClick(country)}>
                <View style={styles.row}>
                    <Text style={styles.title}>
                        {country.name}
                    </Text>
                    <View style={styles.separator}/>
                </View>
            </TouchableElement>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    row: {
      justifyContent: 'center',
      flex: 1
    },
    separator: {
      height: 1,
      backgroundColor: '#CCCCCC'
    },
    title: {
      flex: 1,
      alignItems: 'flex-start',
      fontSize: 16,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10
    }
});
