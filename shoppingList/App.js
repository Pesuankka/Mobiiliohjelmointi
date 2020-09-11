import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writeYourProduct: "",
      result: " ",
      shoppingList: [{ id: 0, item: "" }],
    };
  }

  setText(writeYourProduct) {
    this.setState({ writeYourProduct: String(writeYourProduct) });
  }

  buttonPressed = (isMinus) => {
    const { writeYourProduct, shoppingList } = this.state;
    const productNew = shoppingList;

    if (isMinus) {
      const addProduct = writeYourProduct;
      productNew.push({
        id: 0,
        item: writeYourProduct,
      });
      this.setState({ result: writeYourProduct, shoppingList: productNew });
    } else {
      const removeProduct = (this.state.shoppingList.length = "");
      productNew.push({
        id: 0,
        item: removeProduct,
      });
      this.setState({ result: removeProduct, shoppingList: productNew });
    }
  };

  flatListShort = (historyOneProductListed) => {
    return <Text>{historyOneProductListed.item.item}</Text>;
  };

  render() {
    const { writeYourProduct, result, shoppingList } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.teksti}>
          <TextInput
            style={{ width: 200, borderColor: "black", borderWidth: 2 }}
            onChangeText={(writeYourProduct) => this.setText(writeYourProduct)}
            value={writeYourProduct}
          />
        </View>
        <View style={styles.btn}>
          <Button title="ADD" onPress={() => this.buttonPressed(true)} />
          <Button title="CLEAR" onPress={() => this.buttonPressed(false)} />
        </View>
        <Text style={styles.shoppingText}>Shopping List</Text>
        <FlatList
          style={styles.flatListRender}
          data={shoppingList}
          renderItem={this.flatListShort}
          keyExtractor={(item, index) => index.toString()}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

//TYYLITTELYT

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: "#f07b59",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  btn: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  teksti: {
    marginTop: 10,
    marginBottom: 10,
  },
  flatListRender: {
    flex: 1,
  },
  shoppingText: {
    fontSize: 20,
  },
});

export default App;
