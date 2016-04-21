'use strict';

// ReactNative Components
import React, {
    Component,
    ListView,
    Platform
} from "react-native";

import Item from './Item';

export default class List extends Component {

    renderRow(country) {
        return <Item
            country={country}
            onItemClick={this.props.onItemClick}
        />;
    }

    render() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        var items = dataSource.cloneWithRows(this.props.items);
        return (
            <ListView
                dataSource={items}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}