import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'
import MapView from 'react-native-maps';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const blue = '#00f'
        return (
            <View style={styles.container}>
                {// rubriken & tags
                }
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
