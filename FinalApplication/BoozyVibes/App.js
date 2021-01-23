import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  Image
} from "react-native";

export default function App() {
  const [cocktail, setCoctail] = useState("");
  //const [thumbnail, setThumbnail] = useState([]);
  //const [imageSource, setImageSource] = useState([]);
  
  const [title, setTitle] = useState("");
 

  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + title;

  const getCoctail = (cocktails) => {
   
   
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => setCoctail(data.drinks))
    .catch((err) => console.log(err));
  
  };

  const renderMyItem = (item) => {
    return (
      <View>
        <Text>{item.strDrink}</Text>
        <Image
            style={styles.thumbImage}
            source={{ uri: item.strDrinkThumb}}
          ></Image> 
        <Text>{item.strIngredient1 + ' ' + item.strMeasure1}</Text>
        <Text>{item.strIngredient2 + ' ' + item.strMeasure2}</Text>
        <Text>{item.strIngredient3 + ' ' + item.strMeasure3}</Text>
        <Text>{item.strIngredient4 + ' ' + item.strMeasure4}</Text>
        <Text>{item.strIngredient5 + ' ' + item.strMeasure5}</Text>
        <Text>{item.strIngredient6 + ' ' + item.strMeasure6}</Text>
        <Text>{item.strIngredient7 + ' ' + item.strMeasure7}</Text>
        <Text>{item.strIngredient8 + ' ' + item.strMeasure8}</Text>
        <Text>{item.strInstructions}</Text>
        <View style={styles.imageBox}>

        </View>
      </View>
    );
  };

  return (
    <View>
      <TextInput
        style={styles.textinput}
        value={title}
        placeholder="Search Coctails"
        onChangeText={(title) => setTitle(title)}
      />
      <Button title="Search" onPress={getCoctail}></Button>
      <FlatList
          style={styles.flatListStyle}
          data={cocktail}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderMyItem(item.item)}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    height: 300,
    textAlign: "center",
  },
  listseparator: {
    height: 1,
    width: "80%",
    backgroundColor: "#CED0CE",
  },
  textinput: {
    fontSize: 18,
    width: 200,
    backgroundColor: "#CED0CE",
    marginTop: 60,
    marginBottom: 20,
    alignSelf: "center",
  },
  Image: {
    width: 70,
    height: 70,
    marginBottom: 20,
    marginTop: 20,
  },
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  flatListStyle: {
    marginTop: 70,
    height: 400,
    textAlign: "center",
    margin: 20,
    backgroundColor: "#f3f3f3",
  } ,
    thumbImage: {
    width: 120,
    height: 120,
    marginLeft: '50%',
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
  },
});
