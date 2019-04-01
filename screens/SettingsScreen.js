import React from 'react';
import {
    View,
    StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage
} from 'react-native'


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


    state = {
        rubriken: [{ id: 0, text: '', color: '#fdae12' }],
        newRubrik: { id: 0, text: '', color: '#fdae12' },
        tags: [{ id: 0, text: '' }],
        newTag: { id: 0, text: '' },
        serverAddress: '192.168.1.110',
    }

    componentDidFocus = async (payload) => {
        let token = await AsyncStorage.getItem('token')
        fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/rubrik', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(rubriks => this.setState({ rubriken: rubriks }))
        fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/tag', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(tags => this.setState({ tags: tags }))
    }


    componentDidMount = () => {
        this.subs = [
            this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
        ];
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    sendRubrik = async (rubrik) => {
        let token = await AsyncStorage.getItem('token')
        fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/rubrik', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(rubrik)
        }).then(response => response.json())
    }
    sendTags = async (tag) => {
        let token = await AsyncStorage.getItem('token')
        fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/tag', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(tag)
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
        let tagC = null
        let tags = this.state.tags;
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].id === id) {
                tags[i].text = text;
                tagC = tags[i]
            }
        }
        console.log(tagC)
        if (tagC !== null)
            this.sendTags(tagC)
        this.setState({ tags })
    }

    getColorValue = (color) => {
        return parseInt(color.substring(1, 3), 16) + parseInt(color.substring(3, 5), 16) + parseInt(color.substring(5, 7), 16);
    }

    ocnewRChange = (color) => {
        let newRubrik = this.state.newRubrik
        newRubrik.color = color
        this.setState({ newRubrik })
    }
    ocNewRubrikText = (text) => {
        let newRubrik = this.state.newRubrik
        newRubrik.text = text
        this.setState({ newRubrik })
    }
    ocNewTagText = (text) => {
        let newTag = this.state.newTag
        newTag.text = text
        this.setState({ newTag })
    }
    sendNewRubrik = () => {
        let rubriken = this.state.rubriken
        rubriken.push(this.state.newRubrik)
        this.sendRubrik(this.state.newRubrik)
            .then(() => { this.setState({ newRubrik: { id: 0, text: '', color: '#fdae12' }, rubriken }) })
    }
    sendNewTag = () => {
        let tags = this.state.tags
        tags.push(this.state.newTag)
        this.sendTags(this.state.newTag)
            .then(() => { this.setState({ newTag: { id: 0, text: '' }, tags }) })
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
                    <View>
                        <TextInput placeholder={"add new title"} style={styles.textInput} placeholderTextColor={"#a6dff2"} maxLength={30} value={this.state.newRubrik.text} onChangeText={(text) => this.ocNewRubrikText(text)} />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Color', { color: this.state.newRubrik.color, onChange: (color) => this.ocnewRChange(color) })}
                            style={[{
                                backgroundColor: this.state.newRubrik.color,
                            }, styles.btn]}>
                            <Text style={{ color: this.getColorValue("#888888") < this.getColorValue(this.state.newRubrik.color) ? "#000" : "#fff" }}>Color</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sendNewRubrik()} style={[styles.btn, { backgroundColor: 'white' }]}>
                            <Text>Send Rubrik</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text>Tags</Text>
                    {this.state.tags.map((tag) =>
                        <View key={tag.id}>
                            <TextInput placeholder={"title"} style={styles.textInput} placeholderTextColor={"#a6dff2"} maxLength={30} value={tag.text} onChangeText={(text) => this.ocTagsText(tag.id, text)} />
                        </View>
                    )}
                    <View>
                        <TextInput placeholder={"new Tag title"} style={styles.textInput} placeholderTextColor={"#a6dff2"} maxLength={30} value={this.state.newTag.text} onChangeText={(text) => this.ocNewTagText(text)} />
                    </View>
                    <TouchableOpacity onPress={() => this.sendNewTag()} style={[styles.btn, { backgroundColor: 'white' }]}>
                        <Text>Send Tag</Text>
                    </TouchableOpacity>
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
