import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native'
import MapView from 'react-native-maps';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

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
          <MapView.Marker
            coordinate={{
              latitude: 47.4971627,
              longitude: 8.718622,
            }}
            title={"title"}
            description={"description"}
          />
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
