import React from 'react';
import { View, StyleSheet, TextInput, ActionSheetIOS, TouchableOpacity, Text, FlatList } from 'react-native';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    newNugget: {
      title: '',
      text: '',
      imgB64: '',
      rubrik: null,
      tags: [],
    },
    tags: ['Cancel', 'test', 'test2'],
    rubriken: ['Cancel', 'test', 'test2']
  }

  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.topMargin}></View>
        {//  <Image source={{ uri: 'http://' + this.state.serverAddress + '/' + nugget.image }}
          //   style={styles.nuggetImage} />
        }
        <View style={styles.img}>
          <Text>bild</Text>
        </View>
        <Text style={styles.txt}>titel</Text>
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>


      </View>
    )
  }

}

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 70,

  },
  img: {
    borderColor: '#000',
    borderWidth: 1,
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
