import React from 'react';
import {
    View,
    StyleSheet, Text, TouchableOpacity
} from 'react-native'
import { ColorPicker } from 'react-native-color-picker'


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null,
        bottomTabBar: null
    };




    render() {
        const onChange = this.props.navigation.getParam('onChange', (color) => { });
        const color = this.props.navigation.getParam('color', '#aaa');
        return (
            <View style={{ flex: 1, padding: 15, backgroundColor: '#212021' }}>
                <View style={styles.topMargin}></View>
                {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{ color: '#fafafa' }}>{'Back'}</Text></TouchableOpacity> */}
                <ColorPicker oldColor={color} onColorSelected={color => { onChange(color); this.props.navigation.goBack() }} style={{ flex: 1 }} />
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
    topMargin: {
        marginTop: 70,
    },
});
