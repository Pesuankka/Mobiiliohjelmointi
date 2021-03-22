import React, { useEffect, useState } from "react";
import { SafeAreaView, ImageBackground, View, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Card,
  ApplicationProvider,
  Text,
} from "@ui-kitten/components";

export const HomeScreen = ({ navigation }) => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const dateNow = new Date();
    var date = dateNow.getDate();
    var month = dateNow.getMonth() + 1;
    var year = dateNow.getFullYear();
    var hours = dateNow.getHours();
    var min = dateNow.getMinutes();
    setDateTime(date + "/" + month + "/" + year + " " + hours + ":" + min);
    return () => {
      console.log("Unmount");
    };
  }, []);

  const navigateFavorites = () => {
    navigation.navigate("Fav");
  };

  const navigateSearch = () => {
    navigation.navigate("Search");
  };

  const CardImageHeader = () => (
    <ImageBackground
      style={styles.header}
      source={require("../assets/images/partycover2.jpg")}
    >
      <View style={styles.child} />
      <Text>{dateTime}</Text>
      <Text status="basic" style={styles.h1} category="h1">
        Breeze
      </Text>
      <Text status="basic" style={styles.h5} category="h5">
        You deserve a take off - So let us start by searching a drink with
        Breeze!
      </Text>
      <Button
        status="danger"
        size="medium"
        style={styles.button}
        onPress={navigateSearch}
      >
        FIND DRINKS
      </Button>
      <Button
        status="danger"
        size="medium"
        style={styles.button}
        onPress={navigateFavorites}
      >
        MY FAVOURITES
      </Button>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Breeze" alignment="center" />
      <Layout style={styles.container}>
        <Card header={CardImageHeader}></Card>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  h1: {
    marginTop: 100,
    marginBottom: 20,
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  h5: {
    marginTop: 20,
    marginBottom: 100,
    textAlign: "center",
    margin: 70,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  button: {
    width: 150,
    position: "relative",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    height: "98.9%",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  child: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(255,61,133,0.1)",
  },
});
