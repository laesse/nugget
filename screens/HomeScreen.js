import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,

} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    nuggets: [],
    serverAddress: '192.168.100.3',

  }

  componentDidFocus = (payload) => {
    fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/nugget')
      .then(response => response.json())
      .then(nuggets => this.setState({ nuggets }))
  }

  componentDidMount = () => {
    this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload))
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder={"search"} style={styles.searchbar} placeholderTextColor={"#a6dff2"} maxLength={30} onChangeText={this.search} />
        <ScrollView style={styles.container} >
          {this.state.nuggets ?
            this.state.nuggets.map((nugget) => {
              return (
                <View key={nugget.id} style={styles.nugget}>
                  <TouchableOpacity style={styles.nuggetBox} onPress={() => this.nuggetPressed(nugget)} >
                    <View>
                      <Text style={styles.nuggetText}>{nugget.text}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', }}>
                      <Image source={{ uri: 'http://' + this.state.serverAddress + ':8080' + nugget.imgLink }} style={styles.nuggetImage} />
                    </View>
                    <View style={styles.tagBox}>
                      {nugget.tags.map((tag) => {
                        return (
                          <View key={tag.text} style={styles.tag}><Text>{tag.text}</Text></View>
                        )
                      })}
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })
            : <></>
          }
        </ScrollView>
      </View>
    );
  }
  search = (text) => {
    console.log(text)

  }
  nuggetPressed = (nugget) => {
    this.props.navigation.navigate('Detail', {
      nugget: nugget
    })
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ab2e0',
  },
  tag: {
    flex: 1,
    borderRadius: 10,
    height: 20,
    marginLeft: 5,
    paddingLeft: 5,
    backgroundColor: '#555'
  },
  tagBox: {
    flexDirection: 'row',
    flex: 1,

  },
  searchbar: {
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#63c7e9',
    borderRadius: 10,
    color: '#198cb3',
    padding: 3,

  },
  nuggetBox: {
    marginTop: 30
    , opacity: 0.8
    , marginLeft: 10
    , marginRight: 10
    , backgroundColor: '#888'
    , borderRadius: 5
    , padding: 10
  },
  nuggetImage: {
    flex: 1,
    //width: '100%',
    height: 275,
    resizeMode: 'contain',
  },
  nuggetText: {
    textAlign: 'center'
    , color: '#fdfdfd'
  },

});
