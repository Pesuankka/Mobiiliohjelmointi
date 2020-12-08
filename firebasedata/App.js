import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtfBn0p7LF_HqajrFy5pYDJP2oOPaeeZg",
  authDomain: "shoppinglistwithfirebase-17dc9.firebaseapp.com",
  databaseURL:
    "https://shoppinglistwithfirebase-17dc9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglistwithfirebase-17dc9",
  storageBucket: "shoppinglistwithfirebase-17dc9.appspot.com",
  messagingSenderId: "18298864895",
  appId: "1:18298864895:web:67e01219688f9b0e5db8ca",
  measurementId: "G-TMWY84CSW6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [list, setList] = useState([]);

  const saveItem = () => {
    firebase.database().ref("list/").push({ product: product, amount: amount });
    setAmount('')
    setProduct('')
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    firebase
      .database()
      .ref("list/")
      .on("value", (snapshot) => {
        const responseList = Object.values(snapshot.val());
        setList(responseList);
      });
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#FCDAB0",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 80 }}>
        <TextInput
          placeholder=" Product"
          style={{
            marginTop: 30,
            fontSize: 18,
            width: 200,
            borderColor: "#666FDE",
            borderWidth: 2,
          }}
          onChangeText={(product) => setProduct(product)}
          value={product}
        />
        <TextInput
          placeholder=" Amount"
          keyboardType="numeric"
          style={{
            marginTop: 5,
            marginBottom: 5,
            fontSize: 18,
            width: 200,
            borderColor: "#666FDE",
            borderWidth: 2,
          }}
          onChangeText={(amount) => setAmount(amount)}
          value={amount}
        />
        <Button onPress={saveItem} title="Save" />
        <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 20 }}>
          Shopping List
        </Text>
        <FlatList
          style={{ marginLeft: "5%" }}
          data={list}
          renderItem={({ item }) => (
            <View
              style={{
                height: 50,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Product: {item.product}</Text>
              <Text>Amount: {item.amount}</Text>
            </View>
          )}
          ItemSeparatorComponent={listSeparator}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCDAB0",
    alignItems: "center",
    justifyContent: "center",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#FCDAB0",
    alignItems: "center",
  },
});
