import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 0,
      arvattavaNumero: Number(Math.floor(Math.random() * 99) + 1),
      yritykset: 1,
      result: 0,
    };
  }

  setText(text) {
    this.setState({ text: Number(text) });
  }

  buttonPressed = (nappiaPainettu) => {
    const { text, arvattavaNumero, yritykset } = this.state;

    this.setState({ yritykset: Number(yritykset + 1) });

    if (text === arvattavaNumero) {
      this.setState({
        result: "AWESOME! You guessed the number in " + yritykset + " guesses",
      });
      Alert.alert(
        "AWESOME! You guessed the number in " + yritykset + " guesses"
      );
    } else if (text > arvattavaNumero) {
      this.setState({ result: "Your guess: " + text + " is too high" });
    } else if (text < arvattavaNumero) {
      this.setState({ result: "Your guess: " + text + " is too low" });
    } else {
      this.setState({ result: "Only numbers between 1-100" });
    }
  };

  render() {
    const { text, arvattavaNumero, yritykset, result } = this.state;
    return (
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <View style={styles.textInputti}>
          <TextInput
            keyboardType={"Numeric"}
            style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => this.setText(text)}
            value={`${text}`}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Quess me!"
            onPress={(nappiaPainettu) => this.buttonPressed(true)}
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
    backgroundColor: "#EB5644",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInputti: {
    backgroundColor: "#A0C1FA",
    marginTop: 15,
    marginBottom: 15,
  },
});

export default App;
