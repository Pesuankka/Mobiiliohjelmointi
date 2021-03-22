import React, { useState, useEffect } from "react";
import {
  StyleSheet,
} from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  Text,
  List,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";
import DrinkCard from "./DrinkCardComponent";
import { Header } from "react-native/Libraries/NewAppScreen";
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

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const FavScreen = ({ navigation }) => {
  const [cocktail, setCocktail] = useState({});

  useEffect(() => {
    fetchData();
    return () => {
      console.log("Unmount");
    };
  }, []);

  const fetchData = () => {
    firebase
      .database()
      .ref("list/")
      .on("value", (snapshot) => {
        const snapshotValue = snapshot.val();
        if (snapshotValue == null) {
          setCocktail({});
          return;
        }
        const keyValuePairs = Object.entries(
          snapshotValue
        ).map(([key, value]) => ({ key, value }));
        setCocktail(
          keyValuePairs.map(({ value, key }) => ({ ...value, fireBaseId: key }))
        );
      });
  };

  //Del
  const deleteItem = (id) => {
    firebase.database().ref("list/").child(id).remove();
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <React.Fragment>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h6">Favourites</Text>
        <Divider></Divider>
        <Layout></Layout>
        <TopNavigation accessoryLeft={BackAction} title='Home'/>
        <Divider />
        <List
          data={cocktail}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) =>
            DrinkCard(item.item.cocktail, deleteItem, item.item.fireBaseId)
          }
        />
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 20,
  },
});
