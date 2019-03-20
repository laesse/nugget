import React from 'react';
import {
  View,
  StyleSheet, TouchableHighlight, Text
} from 'react-native'
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {
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

  markerClick = (nugget) => {
    this.props.navigation.navigate('Detail', {
      nugget: nugget
    })
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

          {this.state.nuggets.map((nugget) => {
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
