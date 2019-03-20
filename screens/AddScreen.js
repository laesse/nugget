import React from 'react';
import { View, StyleSheet, TextInput, ActionSheetIOS, TouchableOpacity, Text, FlatList } from 'react-native';

export default class LinksScreen extends React.Component {
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

  showRubriken = () => {
    let rubriken = this.state.rubriken
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: rubriken,
        cancelButtonIndex: 0,
        title: 'Rubriken',
      },
      (i) => {
        console.log(i)
        if (i > 0) {
          var newNugget = this.state.newNugget
          newNugget.rubrik = rubriken[i]
          this.setState({ newNugget })
        }
      },
    )
  }

  remove = (arr, i) => {
    let out = []
    for (let j = 0; j < arr.length; j++) {
      if (i !== j)
        out.push(arr[j])
    }
    return out
  }

  showTags = () => {
    var tags = this.state.tags
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: tags,
        cancelButtonIndex: 0,
        title: 'Tag',
      },
      (i) => {
        console.log(i)
        if (i > 0) {
          var newNugget = this.state.newNugget
          newNugget.tags.push(tags[i])
          tags = this.remove(tags, i)
          this.setState({ newNugget, tags })
        }
      },
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topMargin}></View>
        <TextInput placeholder={"title"} style={styles.textInput} placeholderTextColor={"#a6dff2"} maxLength={30} value={this.state.newNugget.title} onChangeText={this.ocTitle} />

        <TextInput multiline={true} placeholder={"text"} style={[styles.textInput, styles.multilineInput]} placeholderTextColor={"#a6dff2"} maxLength={30} value={this.state.newNugget.text} onChangeText={this.ocText} />

        {this.state.newNugget.rubrik ?
          <View style={styles.box}>
            <Text>{this.state.newNugget.rubrik}</Text>
          </View>
          :
          <TouchableOpacity onPress={this.showRubriken} style={styles.btn}>
            <Text>Rubrik</Text>
          </TouchableOpacity>
        }
        <View style={styles.box}>
          {this.state.newNugget.tags.length > 0 ?
            this.state.newNugget.tags.map((item) => <Text key={item}>{item}</Text>)
            : <></>}
        </View>
        {this.state.tags.length > 1 ?
          <TouchableOpacity onPress={this.showTags} style={styles.btn}>
            <Text>Tags</Text>
          </TouchableOpacity> : <></>
        }

        <TouchableOpacity onPress={this.submit} style={styles.btn}>
          <Text>save</Text>
        </TouchableOpacity>


      </View>
    );
  }

  submit = () => {

  }

  ocTitle = (text) => {
    let newNugget = this.state.newNugget
    newNugget.title = text
    this.setState({ newNugget })
  }

  ocText = (text) => {
    let newNugget = this.state.newNugget
    newNugget.text = text
    this.setState({ newNugget })
  }

}

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 70,
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
