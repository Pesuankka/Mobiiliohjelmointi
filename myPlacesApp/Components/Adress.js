import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, FlatList } from "react-native";
import * as SQlite from "expo-sqlite";
import { Icon } from "react-native-elements";
import { Input, Button } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { SQLError } from "expo-sqlite";

const db = SQlite.openDatabase("myplaces.db");

function AdressSaver({ route, navigation }) {
  const [places, setPlaces] = useState("");
  const [myareas, setMyAreas] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists places (id integer primary key not null, places int, places text);"
      );
    });
    updateList();
  }, []);

  // Save
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into places ( places) values (?);", [places]);
      },
      null,
      updateList
    );
  };

  // Update
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from places;", [], (_, { rows }) =>
        setMyAreas(rows._array)
      );
    });
  };

  // Delete
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from places where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  const navigateToPressed = (item) => {
    navigation.navigate("Map", { itemId: item.id, itemPlaces: item.places });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Type in adress"
        style={{
          marginTop: 30,
          fontSize: 18,
        }}
        onChangeText={(places) => setPlaces(places)}
        value={places}
      />
      <View style={{ width: "50%" }}>
        <Button
          raised
          buttonStyle={{ backgroundColor: "#a4a4a4" }}
          icon={{ name: "add-location", color: "#fff", size: 25 }}
          onPress={saveItem}
          title="Save"
        />
      </View>

      <FlatList
        style={{ marginTop: 20 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Title style={{ width: "55%" }}>
              {item.places}
            </ListItem.Title>
            <ListItem.Subtitle onLongPress={() => deleteItem(item.id)}>
              Show on map{" "}
            </ListItem.Subtitle>
            <View containerStyle={styles.iconStyles}>
              <Icon
                onPress={() => navigateToPressed(item)}
                name="chevron-right"
                type="material-icons"
                color="#4e9ffa"
              />
            </View>
          </ListItem>
        )}
        data={myareas}
      />
    </View>
  );
}

export default AdressSaver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    alignItems: "center",
  },
  iconStyles: {
    fontSize: 10,
    color: "#4E5BFC",
  },
});
