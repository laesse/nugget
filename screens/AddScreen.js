import React from 'react';
import { View, StyleSheet, TextInput, ActionSheetIOS, TouchableOpacity, Text, Keyboard, Image, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
import { ImagePicker } from 'expo';

export default class AddScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    newNugget: {
      id: 0,
      title: '',
      text: '',
      imgB64: '',
      rubrik: null,
      location: null,
      tags: [],
    },
    image: null,
    tags: [],
    rubriken: [],
    serverAddress: '192.168.1.110',
  }


  componentDidFocus = async (payload) => {
    let token = await AsyncStorage.getItem('token')
    fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/rubrik', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(rubriken => this.setState({ rubriken }))
    fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/tag', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(tags => this.setState({ tags }))
  }

  componentDidMount = () => {
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }




  showRubriken = () => {
    let rubriken = this.state.rubriken
    let text = ["Cancel"]
    rubriken.forEach(r => {
      text.push(r.text)
    });

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: text,
        cancelButtonIndex: 0,
        title: 'Rubriken',
      },
      (i) => {
        if (i > 0) {
          var newNugget = this.state.newNugget
          newNugget.rubrik = this.state.rubriken[i - 1]
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
    let text = ["Cancel"]
    var tags = this.state.tags
    tags.forEach(r => {
      text.push(r.text)
    });

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: text,
        cancelButtonIndex: 0,
        title: 'Tag',
      },
      (i) => {
        if (i > 0) {
          var newNugget = this.state.newNugget
          newNugget.tags.push(tags[i - 1])
          tags = this.remove(tags, i - 1)
          this.setState({ newNugget, tags })
        }
      },
    )
  }

  pickImage = async () => {
    const { Permissions } = Expo;
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
    Keyboard.dismiss()
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [16, 9],
        base64: true,
      })
      if (!result.cancelled) {
        let newNugget = this.state.newNugget
        newNugget.imgB64 = result.base64
        this.setState({ image: result, newNugget })
      }
    } else {
      throw new Error('Location permission not granted');
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topMargin}></View>
        <TextInput placeholder={"title"} style={styles.textInput} placeholderTextColor={"#a6dff2"} maxLength={30} value={this.state.newNugget.title} onChangeText={this.ocTitle} />

        <TextInput multiline={true} placeholder={"text"} style={[styles.textInput, styles.multilineInput]} placeholderTextColor={"#a6dff2"} value={this.state.newNugget.text} onChangeText={this.ocText} />

        {this.state.newNugget.rubrik !== null ?
          <View style={styles.box}><View style={styles.line}>
            <Text>{this.state.newNugget.rubrik.text}</Text>
          </View></View>
          :
          <TouchableOpacity onPress={this.showRubriken} style={styles.btn}>
            <Text>Rubrik</Text>
          </TouchableOpacity>
        }


        {(this.state.tags.length >= 1) ?
          <TouchableOpacity onPress={this.showTags} style={styles.btn}>
            <Text>Tags</Text>
          </TouchableOpacity> : <></>
        }

        {this.state.newNugget.tags.length > 0 ? <View style={styles.box}>
          {this.state.newNugget.tags.map((tag) => <View key={tag.id} style={styles.line}><Text>{tag.text}</Text></View>)}

        </View>
          : <></>}


        {this.state.image ?
          <Image
            source={{ uri: this.state.image.uri }}
            style={styles.img}
          />
          :
          <TouchableOpacity onPress={this.pickImage} style={styles.btn}>
            <Text>Image</Text>
          </TouchableOpacity>
        }

        <MapView
          onLongPress={(e) => this.onMapPress(e.nativeEvent.coordinate)}
          style={styles.map}
          showsUserLocation={false}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: 47.4971627,
            longitude: 8.718622,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          }
          }
        >
          {
            this.state.newNugget.location !== null ?
              <MapView.Marker
                coordinate={{
                  latitude: this.state.newNugget.location.latitude,
                  longitude: this.state.newNugget.location.longitude
                }}
              ></MapView.Marker> : <></>
          }
        </MapView>


        <TouchableOpacity onPress={this.submit} style={styles.btn}>
          <Text>save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onMapPress = (cords) => {
    let newNugget = this.state.newNugget
    newNugget.location = cords
    this.setState({ newNugget })
  }

  submit = async () => {
    let token = await AsyncStorage.getItem('token')
    fetch('http://' + this.state.serverAddress + ':8080/nugget/v1/nugget', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(this.state.newNugget)
    }).then(response => { response.json(); console.log(response) })
      .then(
        this.setState({
          newNugget: { id: 0, title: '', text: '', imgB64: '', rubrik: null, location: null, tags: [], }
          , image: null
        }))
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
  map: {
    height: 200,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10
  },
  img: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  topMargin: {
    marginTop: 70,
  },
  box: {
  },
  multilineInput: {
    height: 50
  },
  line: {
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,
    backgroundColor: '#1d9ec9'
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    width: 100,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white'
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
