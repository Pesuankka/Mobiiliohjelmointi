import React from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";

export default function calcuHistory({ route }) {
  const { data } = route.params;
  //console.log(route.params);
  return (
    <View style={styles.container}>
      <View>
        
        <FlatList
          
          style={styles.FlatList}
          data={data}
          ListHeaderComponent={<Text style={styles.historyText}> HISTORY</Text>}
          renderItem={({ item }) => (
            <Text style={styles.historyItemText}>{item.text}</Text>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f28c31",
    alignItems: "center",
    justifyContent: "center",
  },
  FlatList: {
    
    paddingTop: 100,
  },
  historyText: {
    fontSize: 20,
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  historyItemText: {
    fontSize: 15,
    alignContent: "center",
    alignSelf: "center",
  },
});
