import React from 'react';
import {
  View,
  StyleSheet, TouchableHighlight, Text, AsyncStorage
} from 'react-native'
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  state = {
    nuggets: [],
    serverAddress: '192.168.1.110',
  }
  componentDidFocus = async (payload) => {
    let token = await AsyncStorage.getItem('token')
    fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/nugget', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(nuggets => this.setState({ nuggets }))

  }


  componentDidMount = () => {
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }
  markerClick = (nugget) => {
    this.props.navigation.navigate('Detail', {
      nugget: nugget
    })
  }

  marker = () => {
    return (<>{
      this.state.nuggets.map((nugget) => {
        return (
          < MapView.Marker
            key={nugget.id}
            coordinate={{
              latitude: nugget.location.latitude,
              longitude: nugget.location.longitude
            }}
            title={nugget.title}
            description={nugget.text}
            pinColor={nugget.rubrik.color}
            onPress={(e) => { e.stopPropagation(); this.markerClick(nugget) }}
          >

          </MapView.Marker>)
      })}
    </>)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 47.4971627,
            longitude: 8.718622,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          }}
        >
          {this.marker()}
        </MapView>
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
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});
