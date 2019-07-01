//@flow
import React, { Component } from "react";
import { Container, Spinner } from "native-base";

import LoginScreen from "./screens/loginScreen";
import SignUpScreen from "./screens/signUpScreen";
import HomeScreen from "./screens/homeScreen";
import MessageScreen from "./screens/messageScreen";
import withTheme from "./components/withTheme";

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

//import firebase
import firebase, { Notification } from "react-native-firebase";

class IndexScreen extends Component {
  // will check whether someone is logged in or not
  constructor() {
    super();
    this.unsubscriber = null;
  }

  componentDidMount() {
    //create a channel
    this.createChannel();

    //get messaging token
    this.getToken();

    //we pass a callback to onAuthStateChanged
    //user is returned if logged in
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //check permissions for notifications
        firebase
          .messaging()
          .hasPermission()
          .then(enabled => {
            // has permissions
            console.log("[enabled permissions]");

            //notification displayed listener
            this.removeNotificationDisplayedListener = firebase
              .notifications()
              .onNotificationDisplayed((notification: Notification) => {
                // Process your notification as required
                // alert(notification);
                console.log("[display notification]");
                console.log(notification);
              });

            //notification listener (for arrival of notifications)
            this.removeNotificationListener = firebase
              .notifications()
              .onNotification((notification: Notification) => {
                // Process your notification as required
                // alert(notification);
                console.log("[on notification]");
                console.log(notification);
                console.log(notification._notificationId);
                this.displayNotification(notification);
              });

            //logged in, so we need to move to the homeScreen
            this.props.navigation.navigate("Home", {
              user
            });
            //we can pass the user object as param so that we can use on
            //the home screen
          })
          .catch(err => {
            //no permissions
            alert("not allowed to receive notify: OK!");
            firebase
              .requestPermission()
              .then(() => {
                //user has allowed
              })
              .catch(err => {
                //user has not allowed
              });
          });
      } else {
        //not logged in
        this.props.navigation.navigate("Auth");
      }
    });
  }

  getToken() {
    //get token so that we use to send notifications
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          console.log("[fcm token]");
          console.log(fcmToken);
        } else {
          // user doesn't have a device token yet
          alert("failed to get token");
        }
      });
  }

  createChannel() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      "whatsup",
      "whatsup Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("Whatsup Primary Channel");

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }

  displayNotification(notif) {
    const notification = new firebase.notifications.Notification()
      .setNotificationId(notif._notificationId)
      .setTitle(notif._title)
      .setBody(notif._body)
      .setSound("default")
      .setData(notif._data);

    notification.android.setChannelId("whatsup");

    firebase.notifications().displayNotification(notification);
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
}

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const Home = createStackNavigator(
  {
    Chats: HomeScreen,
    Message: MessageScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default withTheme(
  createAppContainer(
    createSwitchNavigator(
      {
        Index: IndexScreen,
        Home: Home,
        Auth: AuthStack
      },
      {
        defaultNavigationOptions: {
          header: null
        }
      }
    )
  )
);
