import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 0, text2: 0, result: 0 };

    //this.buttonPressed = this.buttonPressed.bind(this);
  }

  setText(text) {
    this.setState({ text: Number(text) });
  }

  setText2(text2) {
    this.setState({ text2: Number(text2) });
  }

  buttonPressed = (isMinus) => {
    const { text, text2 } = this.state;
    if (isMinus) {
      this.setState({ result: text + text2 });
    } else {
      this.setState({ result: text - text2 });
    }

    Alert.alert("haa");
  };

  render() {
    const { text, text2, result } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btn}>
          <Button title="+" onPress={(isMinus) => this.buttonPressed(true)} />
          <Button title="-" onPress={(isMinus) => this.buttonPressed(false)} />
        </View>
        <Text>Result: {result}</Text>
        <View style={styles.textInputti}>
          <TextInput
            keyboardType={"Numeric"}
            style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => this.setText(text)}
            value={`${text}`}
          />
          <TextInput
            keyboardType={"Numeric"}
            style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text2) => this.setText2(text2)}
            value={`${text2}`}
          />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}

//TYYLITTELYT

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0F5B5",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  TextInput: {
    flex: 1,
  },
});

export default App;
