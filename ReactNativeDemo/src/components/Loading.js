'use strict';

// ReactNative Components
import React, {
    Component,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

export default class Loading extends Component {

    render() {
        return (
            <TouchableHighlight style={styles.container}>
                <View style={styles.loading}>
                    <Text style={{fontSize: 20}}>Loading...</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
