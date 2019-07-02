import React, { Component } from "react";
import {
  Header,
  Container,
  Left,
  Text,
  Body,
  Title,
  Tab,
  Tabs,
  Icon,
  TabHeading,
  Button,
  Right,
  Content,
  Fab
} from "native-base";
import { StyleSheet, View } from "react-native";

import ChatList from "../components/chatList";

import firebase from "react-native-firebase";

import ImagePicker from "react-native-image-picker";

const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default class HomeScreen extends Component {
  state = {
    page: 0,
    scrollWithoutAnimation: true
  };

  componentDidMount() {
    setTimeout(
      () => this.setState({ page: 1, scrollWithoutAnimation: false }),
      0.1
    );
  }

  pickImage() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        //upload image
        let uploadTask = firebase
          .storage()
          .ref()
          .child("img-" + new Date().getTime())
          .putFile(response.uri)
          .then(snap => {
            console.log(snap.downloadURL);
          })
          .catch(err => console.log(err));

        this.setState({
          avatarSource: source,
          base64Img: response.data
        });
      }
    });
  }

  render() {
    let { page, scrollWithoutAnimation } = this.state;

    return (
      <Container>
        <Header hasTabs noShadow={true}>
          <Left>
            <Title>WhatsApp</Title>
          </Left>
          <Right>
            <Button transparent>
              <Icon name="search" style={{ fontSize: 20 }} />
            </Button>
            <Button transparent>
              <Icon name="md-more" />
            </Button>
          </Right>
        </Header>

        <Tabs page={page} scrollWithoutAnimation={scrollWithoutAnimation}>
          <Tab
            heading={
              <TabHeading>
                <Icon name="camera" />
              </TabHeading>
            }
          >
            <Text>Take Pics</Text>
          </Tab>
          <Tab heading="CHATS">
            <ChatList navigation={this.props.navigation} />

            <Fab onPress={() => this.pickImage()}>
              <Icon name="camera" />
            </Fab>
          </Tab>
          <Tab heading="STATUS">
            <Text>Status</Text>
          </Tab>
          <Tab heading="CALLS">
            <Text>Call me</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
