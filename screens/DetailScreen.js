import React from 'react';
import { View, StyleSheet, TextInput, ActionSheetIOS, TouchableOpacity, Text, Image } from 'react-native';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    nugget: {
      title: '',
      text: '',
      imgLink: '',
      rubrik: null,
      tags: [],
    },
    serverAddress: '192.168.100.3',
  }

  componentDidMount = () => {

  }

  render = () => {
    const nugget = this.props.navigation.getParam('nugget', null);
    return (
      <View style={styles.container}>
        <View style={styles.topMargin}></View>
        <View style={styles.img}>
          <Image source={{ uri: 'http://' + this.state.serverAddress + ':8080' + nugget.imgLink }} style={styles.img} />
        </View>
        <Text style={styles.txt}>{nugget.title}</Text>
        <Text>{nugget.text}</Text>
        <Text></Text>
        <Text></Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 70,

  },
  img: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    height: 300,
    borderRadius: 5
  },
  box: {
    marginTop: 10,
    marginLeft: 10
  },
  multilineInput: {
    height: 50
  },
  btn: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: '#1d9ec9'
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
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#2ab2e0',
  },
});
