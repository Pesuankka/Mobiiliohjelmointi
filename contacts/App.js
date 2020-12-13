import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Button title="GetContact" onPress={getContacts} />
        <FlatList
          style={styles.flatliststyle}
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listcontainer}>
              <Text>{item.name}</Text>
            </View>
          )}
        />

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatliststyle: {
    marginBottom: 20,
    marginTop: 10,
    height: 100,
    width: 200,
    backgroundColor: "#f4f4f4",
  },listcontainer: {
    flexDirection: 'column',
  },
});
