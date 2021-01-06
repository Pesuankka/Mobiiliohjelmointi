import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, FlatList } from "react-native";
import * as SQlite from "expo-sqlite";
import { Header } from "react-native-elements";
import { Icon } from "react-native-elements";
import { Input, Button } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { SQLError } from "expo-sqlite";

const db = SQlite.openDatabase("db.db");

function App() {
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists product (id integer primary key not null, amount int, product text);"
      );
    });
    updateList();
  }, []);

  // Save
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into product (amount, product) values (?, ?);", [
          amount,
          product,
        ]);
      },
      null,
      updateList
    );
  };

  // Update
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from product;", [], (_, { rows }) =>
        setShoppingList(rows._array)
      );
    });
  };

  // Delete
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from product where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: "SHOPPING LIST", style: { color: "#fff" } }}
      ></Header>

      <Input
        placeholder=" Product"
        style={{
          marginTop: 30,
          fontSize: 18,
        }}
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <Input
        placeholder=" Amount"
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontSize: 18,
        }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button
        raised
        icon={{ name: "add-shopping-cart", color: "#fff" }}
        onPress={saveItem}
        title="Save"
      />
      <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 20 }}>
        <Icon name="shopping-basket" type="material-icons" color="#4e9ffa" />
      </Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider style={{ width: "100%" }}>
            <ListItem.Title>{item.product}</ListItem.Title>
            <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
            <View containerStyle={styles.iconStyles}>
              <Icon
                onPress={() => deleteItem(item.id)}
                name="delete"
                type="material-icons"
                color="#4e9ffa"
              />
            </View>
          </ListItem>
        )}
        data={shoppingList}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0fefd",
    alignItems: "center",
    justifyContent: "center",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#e0fefd",
    alignItems: "center",
  },
  iconStyles: {
    fontSize: 10,
    color: "#4E5BFC",
  },
});
