import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
} from "react-native";

export default function calculator({ navigation }) {
  const [result, setResult] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [data, setHistoria] = useState([]);

  const initialFocus = useRef(null);

  const calculate = (operator) => {
    const [numero1, numero2] = [Number(text1), Number(text2)];

    let result = 0;
    switch (operator) {
      case "+":
        result = numero1 + numero2;
        break;
      case "-":
        result = numero1 - numero2;
        break;
    }
    setResult(result);
    setHistoria([
      ...data,
      {
        key: String(data.length),
        text: `${numero1} ${operator} ${numero2} = ${result}`,
      },
    ]);
    setText1("");
    setText2("");
    initialFocus.current.focus();
    //console.log(setHistoria);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>Result: {result}</Text>
      <TextInput
        style={styles.textInputti}
        ref={initialFocus}
        keyboardType={"numeric"}
        onChangeText={(text) => setText1(text)}
        value={text1}
      />
      <TextInput
        style={styles.textInputti}
        keyboardType={"numeric"}
        onChangeText={(text) => setText2(text)}
        value={text2}
      />
      <View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => calculate("+")} title="+" />
          <View style={styles.buttonRow}>
            <Text> </Text>
          </View>
          <Button onPress={() => calculate("-")} title="-" />
        </View>
        <Text style={styles.heading}>
          Click below to get to see your history.
        </Text>
        <Button
          title="History"
          onPress={() => navigation.navigate("History", { data })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5c450",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  textInputti: {
    borderColor: "#a769fa",
    borderWidth: 1,
    padding: 5,
    margin: 5,
    width: "50%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
