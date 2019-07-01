import React from "react";
import { Text, Thumbnail } from "native-base";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default ({ detail, navigation }) => (
  <TouchableOpacity
    style={[styles.chatBtn, { flexDirection: "row" }]}
    onPress={() => navigation.navigate("Message")}
  >
    <View style={{ flex: 2 }}>
      <Thumbnail style={{ width: 58, height: 58 }} source={detail.img} />
    </View>

    <View style={{ flex: 8, padding: 5 }}>
      <Text style={{ fontWeight: "bold", color: "rgba(0,0,0,0.8)" }}>
        {detail.name}
      </Text>
      <Text note style={{ color: "rgba(0,0,0,0.5)", fontWeight: "bold" }}>
        {detail.msg}
      </Text>
    </View>

    <View style={{ flex: 2, justifyContent: "center" }}>
      <Text note note style={{ fontSize: 12 }}>
        Yesterday
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  col: {
    padding: 10
  },
  col1: {
    paddingTop: 12
  },
  col2: {
    paddingTop: 13,
    paddingRight: 4
  },
  timestamp: {
    fontSize: 11,
    paddingTop: 5
  },
  timeCol: {
    paddingLeft: 80
  },
  chatBtn: {
    height: 80,
    padding: 15
  },
  row: {
    marginRight: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: "rgba(0,0,0,0.2)"
  }
});
