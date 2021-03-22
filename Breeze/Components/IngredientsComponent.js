import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  Layout,
  Text,
  List,
  Input,
  Card,
  Divider,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
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

export const IngredientScreen = ({ navigation }) => {
  const [ingredient, setKeys] = useState("");
  const [addIngredient, setAddIngredient] = useState("");
  const [addAmount, setAddAmount] = useState("");

  useEffect(() => {
    fetchData();
    return () => {
      console.log("Unmount");
    };
  }, []);

  const fetchData = () => {
    firebase
      .database()
      .ref("IngredientList/")
      .on("value", (snapshot) => {
        const snapshotValue = snapshot.val();
        if (snapshotValue == null) {
          setKeys("");
          return;
        }
        const keyValuePairs = Object.entries(
          snapshotValue
        ).map(([key, value]) => ({ key, value }));
        setKeys(
          keyValuePairs.map(({ value, key }) => ({ ...value, fireBaseId: key }))
        );
        
      });
  };

  const saveItem = () => {
    firebase
      .database()
      .ref("IngredientList/")
      .push({ ingredient: addIngredient, amount: addAmount });
  };

  //Del
  const CreateDelete = ({ keys }) => (
    <View style={styles.footerContainer}>
      <Button
        status="danger"
        onPress={() => deleteItem(keys)}
        style={styles.footerControl}
        size="small"
      >
        Remove
      </Button>
    </View>
  );

  const deleteItem = (value) => {
    firebase.database().ref("IngredientList/").child(value).remove();
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const renderItem = (keys, ingredients, amounts) => (
    <Card>
      <Layout>
        <Layout>
          <Text style={{ position: "absolute" }}>
            {ingredients} - {amounts}
          </Text>
          <CreateDelete
            ingredients={ingredients}
            keys={keys}
            deleteItem={CreateDelete}
          ></CreateDelete>
        </Layout>
      </Layout>
    </Card>
  );

  return (
    <React.Fragment>
      <Layout>
        <Layout
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Text category="h6">Shopping List</Text>
          <Divider></Divider>
          <TopNavigation accessoryLeft={BackAction} title='Home' />
          <Layout style={{ marginTop: 50 }}>
            <Input
              style={{ width: 300, alignSelf: "center" }}
              value={addIngredient}
              placeholder="Ingredient"
              onChangeText={(addIngredient) => setAddIngredient(addIngredient)}
            ></Input>
            <Input
              style={{ width: 300, alignSelf: "center" }}
              value={addAmount}
              placeholder="Amount"
              onChangeText={(addAmount) => setAddAmount(addAmount)}
            ></Input>
            <Layout style={styles.button}>
              <Button size="medium" status="danger" onPress={saveItem}>
                ADD
              </Button>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
      <List
        data={ingredient}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) =>
          renderItem(
            item.item.fireBaseId,
            item.item.ingredient,
            item.item.amount
          )
        }
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 20,
  },
  button: {
    width: 150,
    position: "relative",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
