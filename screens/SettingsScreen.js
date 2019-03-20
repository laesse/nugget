import React from 'react';
import {
    View,
    StyleSheet, Text, TextInput, TouchableOpacity
} from 'react-native'
import { ColorPicker } from 'react-native-color-picker'


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


    state = {
        tags: [
            {
                id: 1,
                text: "abc",
            }, {
                id: 2,
                text: "abcd",
            },
        ],
        rubriken: [{ id: 0, text: '', color: '#fdae12' }],
        serverAddress: '192.168.100.3',
    }

    componentDidFocus = (payload) => {
        fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/rubrik')
            .then(response => response.json())
            .then(rubriks => this.setState({ rubriken: rubriks }))
    }


    componentDidMount = () => {
        this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload))
    }


    sendRubrik = (rubrik) => {
        fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/rubrik', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rubrik)
        }).then(response => response.json())
    }

    ocChange = (id, color) => {
        let rubrikC = null
        let rubriken = this.state.rubriken;
        for (let i = 0; i < rubriken.length; i++) {
            if (rubriken[i].id === id) {
                rubriken[i].color = color;
                rubrikC = rubriken[i]
            }
        }
        if (rubrikC !== null)
            this.sendRubrik(rubrikC)
        this.setState({ rubriken })
    }

    ocRubrikenText = (id, text) => {
        let rubrikC = null
        let rubriken = this.state.rubriken;
        for (let i = 0; i < rubriken.length; i++) {
            if (rubriken[i].id === id) {
                rubriken[i].text = text;
                rubrikC = rubriken[i]
            }
        }
        if (rubrikC !== null)
            this.sendRubrik(rubrikC)
        this.setState({ rubriken })
    }
    ocTagsText = (id, text) => {
        let tags = this.state.tags;
        for (let i = 0; i < tags.length; i++)
            if (tags[i].id === id)
                tags[i].text = text;

        this.setState({ tags })
    }

    getColorValue = (color) => {
        return parseInt(color.substring(1, 3), 16) + parseInt(color.substring(3, 5), 16) + parseInt(color.substring(5, 7), 16);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topMargin}></View>
                <View>
                    <Text>Rubriken</Text>
                    {this.state.rubriken.map((rubrik) =>
                        <View key={rubrik.id}>
                            <TextInput placeholder={"title"} style={styles.textInput} placeholderTextColor={"#a6dff2"} maxLength={30} value={rubrik.text} onChangeText={(text) => this.ocRubrikenText(rubrik.id, text)} />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Color', { color: rubrik.color, onChange: (color) => this.ocChange(rubrik.id, color) })}
                                style={[{
                                    backgroundColor: rubrik.color,
                                }, styles.btn]}>
                                <Text style={{ color: this.getColorValue("#888888") < this.getColorValue(rubrik.color) ? "#000" : "#fff" }}>Color</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View>
                    <Text>Tags</Text>
                    {this.state.tags.map((tag) =>
                        <View key={tag.id}>
                            <TextInput placeholder={"title"} style={styles.textInput} placeholderTextColor={"#a6dff2"} maxLength={30} value={tag.text} onChangeText={(text) => this.ocTagsText(tag.id, text)} />
                        </View>
                    )}
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    btn: {
        marginTop: 20,
        alignSelf: 'center',
        width: 100,
        borderRadius: 30,
        padding: 10,
        alignItems: 'center'
    },
    topMargin: {
        marginTop: 70,
    },
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#2ab2e0',
    },
    textInput: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#63c7e9',
        borderRadius: 10,
        color: '#198cb3',
        padding: 3,
    },
});
