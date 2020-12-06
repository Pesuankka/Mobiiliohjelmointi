import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQlite from "expo-sqlite";
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
          parseInt(amount),
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
    <View  style={styles.container} >
      <View style={{marginTop: 80}}>
      <TextInput
        placeholder=" Product"
        style={{
          marginTop: 30,
          fontSize: 18,
          width: 200,
          borderColor: '#666FDE',
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
          borderColor: '#666FDE',
          borderWidth: 2,
        }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30,marginBottom: 10, fontSize: 20 }}>Shopping List</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
            <Text
              style={{ fontSize: 18, color: "#4E5BFC" }}
              onPress={() => deleteItem(item.id)}
            >
              {" "}
              Bought{" "}
            </Text>
          </View>
        )}
        data={shoppingList}
        ItemSeparatorComponent={listSeparator}
      />
      </View>
    </View>
  );
}

export default App;



const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FCDAB0',
   alignItems: 'center',
   justifyContent: 'center',
  },
  listcontainer: {
    
   flexDirection: 'row',
   backgroundColor: '#FCDAB0',
   alignItems: 'center'
  },
 });