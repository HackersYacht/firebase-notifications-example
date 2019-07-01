import React, { Component } from "react";

import { View, FlatList } from "react-native";

import Chat from "./chat";

import firebase from "react-native-firebase";

export default class ChatList extends Component {
  state = {
    chats: [
      {
        name: "Captain America",
        img: require("../img/cap.png"),
        msg: "Hey Everyone !"
      },
      {
        name: "Guardians of the Galaxy",
        img: require("../img/guardians.jpg"),
        msg: "Hello!... Groot stop!"
      },
      {
        name: "Iron Man",
        img: require("../img/iron-man.jpg"),
        msg: "Some help here!"
      },
      {
        name: "Liam Neeson",
        img: require("../img/liam-neeson.jpg"),
        msg: "I will find you and I will kill you."
      },
      {
        name: "Mark Zuckerberg",
        img: require("../img/mark.jpg"),
        msg: "😃✌️    👍"
      },
      {
        name: "Peter Parker (Spiderman)",
        img: require("../img/pete.jpg"),
        msg: "With great power comes great responsibility 🤨"
      },
      {
        name: "Thor",
        img: require("../img/thor.jpg"),
        msg: "Cause that's what heroes do 😎"
      }
    ]
  };

  componentDidMount() {
    let user = firebase.auth().currentUser;

    firebase
      .database()
      .ref("chatsList")
      // .orderByChild("latestSentAt")
      .on("value", snap => {
        let chats = snap.val();
        // alert(JSON.stringify(chats));
      });
  }

  render() {
    //Here we're using a FlatList to render our list of chats, it's a react native component
    //that makes it easier and better to deal with lists.
    //it has a 'data' prop and we assign to it the array that we want it to loop through.
    //we could have used map, but this is much simpler
    //to 'renderItem' prop we pass the component that knows how to render each item in our list
    //in this case it's the Chat component
    //the 'keyExtractor' prop works like the 'key' prop. we give it a function that returns
    //a unique identifier.

    //for more: https://facebook.github.io/react-native/docs/flatlist.html

    return (
      <FlatList
        data={this.state.chats}
        keyExtractor={(item, index) => JSON.stringify(index)}
        renderItem={({ item }) => {
          return <Chat detail={item} navigation={this.props.navigation} />;
        }}
      />
    );
  }
}
