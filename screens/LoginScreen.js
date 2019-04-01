import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Modal, TouchableHighlight, isAndroid, TextInput
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  state = {
    settings: {
      darkmode: true
    },
    serverAddress: '192.168.100.17',
    username: "",
    password: "",
    passwordConfirm: "",
    registerModal: false,
  }

  componentDidMount = () => {

  }


  render() {
    return (
      <View>
        <View style={{ backgroundColor: '#313335', height: "100%" }}>
          <View style={{ marginTop: "40%", height: "90%" }}>
            <TextInput
              style={{ borderColor: '#fdfdfd', padding: 5, borderWidth: 1, color: '#fdfdfd', borderRadius: 15, marginLeft: "20%", marginRight: "20%" }}
              placeholder="Username"
              onChangeText={(text) => {
                this.setState({ username: text })
              }}
              placeholderTextColor='#fdfdfd'
              autoComplete={'off'}
              multiline={false}
              value={this.state.username}
            />
            <TextInput
              style={{ borderColor: '#fdfdfd', padding: 5, borderWidth: 1, color: '#fdfdfd', borderRadius: 15, marginLeft: "20%", marginRight: "20%", marginTop: "10%" }}
              placeholder="password"
              onChangeText={(text) => {
                this.setState({ password: text })
              }}
              placeholderTextColor='#fdfdfd'
              multiline={false}
              autoComplete={'off'}
              secureTextEntry={true}
              value={this.state.password}
            />

            <TouchableHighlight style={{ marginLeft: "40%", marginRight: "40%", marginTop: 20, backgroundColor: "#444", borderColor: '#fdfdfd', borderRadius: 5, borderWidth: 1, padding: 2 }}
              onPress={() => {
                this.sendLogin()
              }}>
              <Text style={{ textAlign: 'center', color: '#fdfdfd' }}>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{ marginLeft: "40%", marginRight: "40%", marginTop: 20, backgroundColor: "#444", borderColor: '#fdfdfd', borderRadius: 5, borderWidth: 1, padding: 2 }}
              onPress={() => {
                this.setState({
                  registerModal: true, modalVisible: false
                })
              }}>
              <Text style={{ textAlign: 'center', color: '#fdfdfd' }}>Sign Up</Text>

            </TouchableHighlight>
          </View>
        </View>
        <Modal
          transparent={false}
          visible={this.state.registerModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ backgroundColor: '#313335', height: "100%" }}>
            <View style={{ marginTop: "40%", height: "90%" }}>
              <TextInput
                style={{ borderColor: '#fdfdfd', padding: 5, borderWidth: 1, color: '#fdfdfd', borderRadius: 15, marginLeft: "20%", marginRight: "20%" }}
                placeholder="Username"
                onChangeText={(text) => {
                  this.setState({ username: text })
                }}
                placeholderTextColor='#fdfdfd'
                autoComplete={'off'}
                multiline={false}
                value={this.state.username}
              />
              <TextInput
                style={{ borderColor: '#fdfdfd', padding: 5, borderWidth: 1, color: '#fdfdfd', borderRadius: 15, marginLeft: "20%", marginRight: "20%", marginTop: "10%" }}
                placeholder="password"
                onChangeText={(text) => {
                  this.setState({ password: text })
                }}
                placeholderTextColor='#fdfdfd'
                multiline={false}
                autoComplete={'off'}
                secureTextEntry={true}
                value={this.state.password}
              />
              <TextInput
                style={{ borderColor: '#fdfdfd', padding: 5, borderWidth: 1, color: '#fdfdfd', borderRadius: 15, marginLeft: "20%", marginRight: "20%", marginTop: "10%" }}
                placeholder="Confirm password"
                onChangeText={(text) => {
                  this.setState({ passwordConfirm: text })
                }}
                placeholderTextColor='#fdfdfd'
                multiline={false}
                autoComplete={'off'}
                secureTextEntry={true}
                value={this.state.passwordConfirm}
              />
              <TouchableHighlight style={{ marginLeft: "40%", marginRight: "40%", marginTop: 20, backgroundColor: "#444", borderColor: '#fdfdfd', borderRadius: 5, borderWidth: 1, padding: 2 }}
                onPress={() => { this.register() }}>
                <Text style={{ textAlign: 'center', color: '#fdfdfd' }}>Login</Text>

              </TouchableHighlight>

            </View>
          </View>
        </Modal>
      </View>
    );
  }



  register = () => {
    if (this.state.password === this.state.passwordConfirm) {
      fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/auth/reg', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.sha256(this.state.password)
        })
      })
        .then(response => response.json())
        .then(authentication => {
          console.log("token: " + authentication.token)
          if (authentication.successful) {
            AsyncStorage.setItem('token', authentication.token)
              .then(() => this.props.loginDone(authentication.token))
          }
        }
        )
    }
  }

  sendLogin = () => {
    let pdwHash = ""
    pdwHash = this.sha256(this.state.password)

    fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.sha256(this.state.password)
      })
    })
      .then(response => response.json()).then(authentication => {
        console.log(authentication)
        if (authentication.successful) {
          AsyncStorage.setItem('token', authentication.token)
            .then(() => this.props.loginDone(authentication.token))
        }
      })
  }
  componentWillUnmount() {
  }

  sha256 = (data) => {
    var hash = require('hash.js')
    return hash.sha256().update(data).digest('hex').toLowerCase()
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#313335'
    , borderBottomColor: '#313335'
  },
  headerTitleStyle: {
    color: '#fff'
  },
  factBox: {
    marginTop: 30
    , opacity: 0.8
    , marginLeft: 10
    , marginRight: 10
    , backgroundColor: '#888'
    , borderRadius: 5
    , padding: 10
  },
  factImage: {
    flex: 1,
    width: '100%',
    height: 275,
    resizeMode: 'contain',
  },
  factText: {
    textAlign: 'center'
    , color: '#fdfdfd'
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: '50%',
    height: 85,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
