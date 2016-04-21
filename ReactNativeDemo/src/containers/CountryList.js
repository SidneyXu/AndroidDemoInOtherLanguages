'use strict';

// Redux
import {connect} from "react-redux";

// Router-Flux
import {Actions} from "react-native-router-flux";

// ReactNative Components
import React, {
    Component,
    StyleSheet,
    View,
    Platform,
    ToolbarAndroid,
} from "react-native";
import NavigationBar from "react-native-navbar";

// Actions
import {
    fetchCountries,
    showCountry
} from "../actions/actions";

import List from "../components/List";
import Loading from "../components/Loading";

function mapStateToProps(state) {
    return {
        loaded: state.default.get('loaded'),
        items: state.default.get('items'),
        current: state.default.get('current')
    };
}

class CountryList extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchCountries());
    }

    _renderLoadingView() {
        return (
            <Loading/>
        );
    }

    _showSelected(item) {
        alert(item['name']);
    }

    render() {
        const leftButtonConfig = {
            title: 'Back',
            handler: Actions.pop
        };

        const titleConfig = {
            title: 'CountryList'
        };
        const {loaded, items} = this.props;

        if (!loaded) {
            return this._renderLoadingView();
        }

        var HeaderBar = NavigationBar;
        var headerProps = {
            title: {
                title: 'CountryList'
            },
            leftButton: {
                title: 'Back',
                handler: Actions.pop
            }
        };
        if(Platform.OS === 'android'){
            HeaderBar = ToolbarAndroid;
            headerProps = {
                title: 'CountryList',
                titleColor: '#FFFFFF',
                style: {
                    height:56,
                    backgroundColor: '#3F51B5'
                },
                navIcon: require('image!ic_back_18dp'),
                onIconClicked: Actions.pop
            };
        }
        return (
            <View style={styles.container}>
                <HeaderBar
                    {...headerProps} />
                <List items={items}
                      onItemClick={item => this._showSelected(item)}/>
            </View>
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

export default connect(mapStateToProps)(CountryList);
