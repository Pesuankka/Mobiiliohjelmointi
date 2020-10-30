import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-community/picker";
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
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState([]);
  const [finalResult, setFinalResult] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");

  const converterApi =
    "http://data.fixer.io/api/latest?access_key=489e7c868bb3848449a28e2e3dd09193"; 

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const proxyurl = "https://thingproxy.freeboard.io/fetch/";
    const url = proxyurl + converterApi;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        mapRates(json.rates);
        setSelectedItem(json.rates.AED);
      })
      .catch((error) => alert(error));
  };

  const pickYourCurrency = (item, index) => {
    setSelectedItem(item);
    console.log(rates[index].currency);
    setCurrencySymbol(rates[index].currency);
  };

  //mappausta
  const mapRates = (jsonRates) => {
    let newRates = [];
    newRates = Object.entries(jsonRates).map(([key, value]) => ({
      currency: key,
      rate: value,
    }));

    setRates(newRates);
  };

  const showAsEuros = () => {
    setFinalResult(amount * selectedItem);
    console.log(selectedItem);
  };

  return (
    <View>
      <View>
        <View style={styles.euroImageContainer}>
          <Image
            style={styles.euroImage}
            source={{
              uri:
                "https://ijccr.files.wordpress.com/2013/04/money_1832551c.jpg?w=460",
            }}
          ></Image>
        </View>
        <Text style={styles.resultBox}>
          Converted to {finalResult.toFixed(2)} {currencySymbol}
        </Text>
        <View styles={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedItem}
            onValueChange={(item, index) => pickYourCurrency(item, index)}
          >
            {rates.map(({ currency, rate }) => (
              <Picker.Item label={currency} value={rate} key={currency} />
            ))}
          </Picker>
        </View>
        <TextInput
          value={amount}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            textAlign: "center",
            marginBottom: 0,
          }}
          placeholder="How many € you have"
          onChangeText={(amount) => setAmount(amount)}
        ></TextInput>

        <Button title="Convert" onPress={showAsEuros}></Button>
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
  resultBox: {
    marginTop: 40,
    textAlign: "center",
    marginBottom: 50,
    fontSize: 25,
  },
  picker: {
    alignSelf: "center",
    height: 50,
    width: 100,
    marginBottom: 10,
  },
  euroImageContainer: {
    marginTop: 60,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  euroImage: {
    opacity: 1,
    width: 250,
    height: 250,
  },
  pickerContainer: {},
});

export default App;
