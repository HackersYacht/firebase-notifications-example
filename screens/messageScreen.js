import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Body,
  Left,
  Icon,
  Button,
  Title
} from "native-base";

import { View } from "react-native";

import { GiftedChat } from "react-native-gifted-chat";

export default class MessageScreen extends Component {
  state = {
    message: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Name</Title>
          </Body>
        </Header>
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={this.state.messages}
            // onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
            }}
          />
        </View>
      </Container>
    );
  }
}
