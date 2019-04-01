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
  AsyncStorage,

} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    nuggets: [],
    serverAddress: '192.168.1.110',
    token: ""
  }

  componentDidFocus = async (payload) => {
    let token = await AsyncStorage.getItem('token')
    console.log(token)
    fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/nugget', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(nuggets => this.setState({ nuggets, token }))
  }

  componentDidMount = () => {
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder={"search"} style={styles.searchbar} returnKeyType='done' placeholderTextColor={"#a6dff2"} maxLength={30} onChangeText={this.search} />
        <ScrollView style={styles.container} >
          {this.state.nuggets ?
            this.state.nuggets.map((nugget) => {
              return (
                <View key={nugget.id} style={styles.nugget}>
                  <TouchableOpacity style={styles.nuggetBox} onPress={() => this.nuggetPressed(nugget)} >
                    <View>
                      <Text style={styles.nuggetText}>{nugget.title}</Text>
                    </View>
                    <Image
                      source={{ uri: 'http://' + this.state.serverAddress + ':8080' + nugget.imgLink }}
                      resizeMode='stretch'
                      style={{ flex: 1, height: 200, width: '100%', borderRadius: 5, alignSelf: 'center', marginBottom: 10, marginLeft: 10, marginRight: 10 }}
                    />

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

  search = async (text) => {
    let token = this.state.token
    fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/nugget/search', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ searchText: text })
    })
      .then(response => response.json())
      .then(nuggets => this.setState({ nuggets }))
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
    marginRight: 5,
    paddingLeft: 5,
    backgroundColor: '#555',
    alignItems: 'center'
  },
  tagBox: {
    marginLeft: -5,
    marginRight: -5,
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
    //, height: 250
    , padding: 10
    , alignItems: 'center'
  },
  nuggetImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  }
  ,
  nuggetText: {
    alignItems: 'center'
    , color: '#fdfdfd'
  },

});
