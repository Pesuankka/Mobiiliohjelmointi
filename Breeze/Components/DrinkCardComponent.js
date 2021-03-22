import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Divider,
  Layout,
  Text,
  Avatar,
  Card,
  Button,
} from "@ui-kitten/components";
import { Header } from "react-native/Libraries/NewAppScreen";

const FooterAdd = ({ cocktail, saveItem }) => (
  <View style={styles.footerContainer}>
    <Button
      status="danger"
      onPress={() => saveItem(cocktail)}
      style={styles.footerControl}
      size="small"
    >
      SAVE
    </Button>
  </View>
);

const drinkCardWithFooter = (cocktail, saveItem) => {
  const isVisible = true;
  return (
    <React.Fragment>
      <Card
        style={styles.card}
        footer={(props) => (
          <FooterAdd {...props} cocktail={cocktail} saveItem={saveItem} />
        )}
      >
        <Layout style={styles.layoutContainer}>
          <Layout style={styles.layout} level="1">
            <Text category="h4">{cocktail.strDrink}</Text>
          </Layout>
          <Layout style={styles.layout} level="1">
            <Avatar
              size="large"
              style={styles.avatar}
              source={{ uri: cocktail.strDrinkThumb }}
            ></Avatar>
          </Layout>
        </Layout>
        <Divider style={{ marginTop: 5, marginBottom: 5 }}></Divider>
        {isVisible ? (
          <Layout level="1">
            {cocktail.strIngredient1 ? (
              <Text>
                {cocktail.strIngredient1 +
                  " " +
                  (cocktail.strMeasure1 ? cocktail.strMeasure1 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient2 ? (
              <Text>
                {cocktail.strIngredient2 +
                  " " +
                  (cocktail.strMeasure2 ? cocktail.strMeasure2 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient3 ? (
              <Text>
                {cocktail.strIngredient3 +
                  " " +
                  (cocktail.strMeasure3 ? cocktail.strMeasure3 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient4 ? (
              <Text>
                {cocktail.strIngredient4 +
                  " " +
                  (cocktail.strMeasure4 ? cocktail.strMeasure4 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient5 ? (
              <Text>
                {cocktail.strIngredient5 +
                  " " +
                  (cocktail.strMeasure5 ? cocktail.strMeasure5 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient6 ? (
              <Text>
                {cocktail.strIngredient6 +
                  " " +
                  (cocktail.strMeasure6 ? cocktail.strMeasure6 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient7 ? (
              <Text>
                {cocktail.strIngredient7 +
                  " " +
                  (cocktail.strMeasure7 ? cocktail.strMeasure7 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient8 ? (
              <Text>
                {cocktail.strIngredient8 +
                  " " +
                  (cocktail.strMeasure8 ? cocktail.strMeasure8 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient9 ? (
              <Text>
                {cocktail.strIngredient9 +
                  " " +
                  (cocktail.strMeasure9 ? cocktail.strMeasure9 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient10 ? (
              <Text>
                {cocktail.strIngredient10 +
                  " " +
                  (cocktail.strMeasure10 ? cocktail.strMeasure10 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient11 ? (
              <Text>
                {cocktail.strIngredient11 +
                  " " +
                  (cocktail.strMeasure11 ? cocktail.strMeasure11 : "")}
              </Text>
            ) : null}
            <Text>{cocktail.strInstructions}</Text>
          </Layout>
        ) : null}
      </Card>
    </React.Fragment>
  );
};

const FooterDel = ({ value, deleteItem }) => (
  <View style={styles.footerContainer}>
    <Button
      status="danger"
      onPress={() => deleteItem(value)}
      style={styles.footerControl}
      size="small"
    >
      REMOVE
    </Button>
  </View>
);

const drinkCard = (cocktail, deleteItem, value) => {
  const isVisible = true;
  return (
    <React.Fragment>
      <Card
        style={styles.card}
        footer={(props) => (
          <FooterDel {...props} value={value} deleteItem={deleteItem} />
        )}
      >
        <Layout style={styles.layoutContainer}>
          <Layout style={styles.layout} level="1">
            <Text category="h4">{cocktail.strDrink}</Text>
          </Layout>
          <Layout style={styles.layout} level="1">
            <Avatar
              size="large"
              style={styles.avatar}
              source={{ uri: cocktail.strDrinkThumb }}
            ></Avatar>
          </Layout>
        </Layout>
        <Divider style={{ marginTop: 5, marginBottom: 5 }}></Divider>
        {isVisible ? (
          <Layout level="1">
            {cocktail.strIngredient1 ? (
              <Text>
                {cocktail.strIngredient1 +
                  " " +
                  (cocktail.strMeasure1 ? cocktail.strMeasure1 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient2 ? (
              <Text>
                {cocktail.strIngredient2 +
                  " " +
                  (cocktail.strMeasure2 ? cocktail.strMeasure2 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient3 ? (
              <Text>
                {cocktail.strIngredient3 +
                  " " +
                  (cocktail.strMeasure3 ? cocktail.strMeasure3 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient4 ? (
              <Text>
                {cocktail.strIngredient4 +
                  " " +
                  (cocktail.strMeasure5 ? cocktail.strMeasure4 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient5 ? (
              <Text>
                {cocktail.strIngredient5 +
                  " " +
                  (cocktail.strMeasure6 ? cocktail.strMeasure5 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient6 ? (
              <Text>
                {cocktail.strIngredient6 +
                  " " +
                  (cocktail.strMeasure7 ? cocktail.strMeasure6 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient7 ? (
              <Text>
                {cocktail.strIngredient7 +
                  " " +
                  (cocktail.strMeasure8 ? cocktail.strMeasure7 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient8 ? (
              <Text>
                {cocktail.strIngredient8 +
                  " " +
                  (cocktail.strMeasure9 ? cocktail.strMeasure8 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient9 ? (
              <Text>
                {cocktail.strIngredient9 +
                  " " +
                  (cocktail.strMeasure10 ? cocktail.strMeasure9 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient10 ? (
              <Text>
                {cocktail.strIngredient10 +
                  " " +
                  (cocktail.strMeasure11 ? cocktail.strMeasure10 : "")}
              </Text>
            ) : null}
            {cocktail.strIngredient11 ? (
              <Text>
                {cocktail.strIngredient11 +
                  " " +
                  (cocktail.strMeasure12 ? cocktail.strMeasure11 : "")}
              </Text>
            ) : null}
            <Text>{cocktail.strInstructions}</Text>
          </Layout>
        ) : null}
      </Card>
    </React.Fragment>
  );
};

export const DrinkCardWithFooter = drinkCardWithFooter;
export default drinkCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginBottom: 230,
  },
  list: {
    marginBottom: 20,
  },
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
