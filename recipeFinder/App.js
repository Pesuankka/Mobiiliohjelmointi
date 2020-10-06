import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  TextInput,
} from "react-native";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [thumbNail, setThumbNail] = useState([]);

  const recipeUrl =
    "http://www.recipepuppy.com/api/?i=" +
    ingredients +
    "&thumbnail=" +
    thumbNail;

  const getData = () => {
    //Törmäsin tehtävää tehdessä aika isoihin CORS-ongelmiin, joten tehtävän suorittamista varten oli pakko käyttää alta löytyvää linkkiä. Toiset API:t toimivat normaalisti, ongelma oli vain recipepuppyssä.
    const proxyurl = "https://thingproxy.freeboard.io/fetch/";
    const url = proxyurl + recipeUrl;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json.results);
        setIngredients(json.ingredients);
        setThumbNail(json.thumbnail);
      })
      .catch((error) => alert(error));
  };

  const renderMyItem = (item) => {
    console.log();
    return (
      <View>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.imageBox}>
          <Image
            style={styles.thumbImage}
            source={{ uri: item.thumbnail }}
          ></Image>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>
        <FlatList
          style={styles.flatListStyle}
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderMyItem(item.item)}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            textAlign: "center",
          }}
          value={ingredients}
          placeholder="type ingredient"
          onChangeText={(ingredients) => setIngredients(ingredients)}
        ></TextInput>
        <Button title="Click me" onPress={getData}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatListStyle: {
    marginTop: 70,
    height: 400,
    textAlign: "center",
    margin: 20,
    backgroundColor: "#f3f3f3",
  },
  flatListText: {
    flex: 1,
    color: "#000",
  },
  thumbImage: {
    width: 70,
    height: 70,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  recipeTitle: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
  },
});

export default App;

/* import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";

const movieUrl = "https://reactnative.dev/movies.json";

const App = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setScription] = useState("");

  const getData = () => {
    fetch(movieUrl)
      .then((response) => response.json())
      .then((json) => {
        setData(json.movies);
        setTitle(json.title);
        setScription(json.description);
      })
      .catch((error) => alert(error));
  };
  console.log(data);

  const renderMyItem = (item) => {
    console.log();
    return (
      <Text>
        {item.id}
        {item.title}
        {item.releaseYear}
      </Text>
    );
  };

  return (
    

    <View>
      <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <FlatList
          style={styles.flatListStyle}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={(item) => renderMyItem(item.item)}
        />
        <Button title="Click me" onPress={getData}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatListStyle: {
    height: 200,
    margin: 20,
    backgroundColor: "#f3f3f3",
  },
  flatListText: {
    flex: 1,
    height: 50,
    color: "#000",
  },
});

export default App;
 */
