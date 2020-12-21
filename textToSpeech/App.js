import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';

export default function App() {

  const [input, setInput] = useState('')

  const speak = () => {
    Speech.speak(input)
  }


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>Text To Speech</Text>
      <TextInput
      style={styles.textInput}
      value={input}
      onChangeText={(input) => setInput(input)}
      ></TextInput>
      
      <Button title="Press to hear!" onPress={speak}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8f8b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 10,
    width: 200,
    height: 40,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    textAlign: "center",
  },
});
