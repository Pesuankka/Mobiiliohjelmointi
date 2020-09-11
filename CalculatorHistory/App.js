import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text1: 0,
      text2: 0,
      result: " ",
      history: [{ id: 0, item: "Historia:" }],
    };
  }

  setText(text1) {
    this.setState({ text1: Number(text1) });
  }

  setText2(text2) {
    this.setState({ text2: Number(text2) });
  }

  buttonPressed = (runMath) => {
    const { text1, text2, history } = this.state;
    const HistoryNew = history;

    if (runMath) {
      const sum = text1 + text2;
      HistoryNew.push({
        id: 2,
        item: text1 + " + " + text2 + " = " + sum,
      });
      this.setState({ result: text1 + text2, history: HistoryNew });
    } else {
      const minus = text1 - text2;
      HistoryNew.push({
        id: 2,
        item: text1 + " - " + text2 + " = " + minus,
      });
      this.setState({ result: text1 - text2, history: HistoryNew });
    }
  };

  flatListShort = (HistoryOneLine) => {
    return <Text>{HistoryOneLine.item.item}</Text>;
  };

  render() {
    const { text1, text2, result, history } = this.state;
    return (
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <View style={styles.teksti}>
          <TextInput
            keyboardType={"numeric"}
            style={{ width: 200, borderColor: "black", borderWidth: 2 }}
            onChangeText={(text1) => this.setText(text1)}
            value={`${text1}`}
          />
          <TextInput
            keyboardType={"numeric"}
            style={{ width: 200, borderColor: "black", borderWidth: 2 }}
            onChangeText={(text2) => this.setText2(text2)}
            value={`${text2}`}
          />
        </View>
        <View style={styles.btn}>
          <Button title="+" onPress={(runMath) => this.buttonPressed(true)} />
          <Button title="-" onPress={(runMath) => this.buttonPressed(false)} />
        </View>
        <FlatList
          style={styles.flatListRender}
          data={history}
          renderItem={this.flatListShort}
          keyExtractor={(item, index) => index.toString()}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: "#99FFCE",
    alignItems: "center",
    fontSize: 20,
  },
  btn: {
    alignItems: "center",
    flexDirection: "row",
  },
  teksti: {
    marginTop: 10,
    marginBottom: 10,
  },
  flatListRender: {
    flex: 1,
  },
});

export default App;
