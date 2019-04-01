import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage, Vibration } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isLoggedIn: false,
    token: '',

  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      console.log("laden")
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      if (!this.state.isLoggedIn) {
        console.log("login")
        return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <LoginScreen loginDone={(token) => {
              this.setState({ isLoggedIn: true, token })
              Vibration.vibrate(1000)
            }} />
          </View>
        )
      } else {
        console.log("seite")
        return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        );
      }
    }
  }

  _loadResourcesAsync = async () => {
    this.getToken()
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  getToken = async () => {
    let token = await AsyncStorage.getItem('token')
    //console.log(token)
    if (token === "" || token === null)
      await this.setState({ token, isLoggedIn: false })
    else
      await this.setState({ token, isLoggedIn: true })
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
