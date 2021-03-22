import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  Button,
  Layout,
  TopNavigation,
  List,
  Input,
  Icon,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import { Header } from "react-native/Libraries/NewAppScreen";
import { DrinkCardWithFooter } from "./DrinkCardComponent";

//FIREBASE
import * as firebase from "firebase";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgPt8UBKperOeEausu2XasiMOI5jGcO0Y",
  authDomain: "breezedatabase.firebaseapp.com",
  databaseURL:
    "https://breezedatabase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "breezedatabase",
  storageBucket: "breezedatabase.appspot.com",
  messagingSenderId: "466185259758",
  appId: "1:466185259758:web:16878f68608282581541ff",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//ENDFIREBASE

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const SearchScreen = ({ navigation }) => {
  const [cocktail, setCocktail] = useState([]);
  const [title, setTitle] = useState("");

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + title;

  const getCoctail = (cocktails) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCocktail(data.drinks);
      })
      .catch((err) => console.log(err));
  };

  //Save
  const saveItem = (cocktail) => {
    firebase.database().ref("list/").push({ cocktail: cocktail });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout>
        <Layout style={{ justifyContent: "center", alignItems: "center" }}>
          <Text category="h6">Search Drinks</Text>
        </Layout>
        <TopNavigation accessoryLeft={BackAction} title='Home' />
        <Input
          style={{ width: 300, alignSelf: "center", marginTop: 30 }}
          value={title}
          placeholder="Search Cocktails"
          onChangeText={(title) => setTitle(title)}
        />
        <Layout style={styles.button}>
          <Button
            size="medium"
            title="Search"
            status="danger"
            onPress={getCoctail}
          >
            SEARCH
          </Button>
        </Layout>
      </Layout>
      <List
        data={cocktail}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => DrinkCardWithFooter(item.item, saveItem)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerControl: {
    width: 100,
    justifyContent: "center",
    position: "relative",
    alignSelf: "center",
  },
  footerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    margin: 35,
    marginBottom: -5,
  },
  avatar: {
    margin: 8,
    height: 110,
    width: 110,
  },
  layoutContainer: {
    flex: 1,
    flexDirection: "row",
  },
  layout: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    width: 150,
    position: "relative",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
