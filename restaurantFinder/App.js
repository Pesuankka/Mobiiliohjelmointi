import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const baseUrl =
  "http://www.mapquestapi.com/geocoding/v1/address?key=******************************=";

export default function App() {
  //Paikan hakuun liittyvät hookit
  const [region, setRegion] = useState({
    latitude: 61.171462,
    longitude: 28.770861,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [input, setInput] = useState("");
  const [markers, setMarkers] = useState([]);

  const getLocation = () => {
    const url = baseUrl + input;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setInput(json.results[0].providedLocation.location);
        mapRegionAttributes(json.results[0].locations[0].latLng);
      })
      .catch((error) => alert(error));
  };

  const mapRegionAttributes = (fetchedRegion) => {
    let region = {
      latitude: Number(fetchedRegion.lat),
      longitude: Number(fetchedRegion.lng),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    setRegion(region);
  };

  const showRestaurants = () => {
    const restaurantUrl =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=" +
      region.latitude +
      "," +
      region.longitude +
      "&type=restaurant&radius=200&key=************************";
    fetch(restaurantUrl)
      .then((response) => response.json())
      .then((json) => {
        setRestaurantMarker(json.results);
      })
      .catch((error) => alert(error));
  };

  const regionAndLocation = () => {
    showRestaurants();
    getLocation();
  };

  const setRestaurantMarker = (jsonMarkers) => {
    let marker = [];
    marker = jsonMarkers.map((element) => ({
      location: element.geometry.location,
      name: element.name,
      vicinity: element.vicinity,
    }));

    setMarkers(marker);
  };

  const onRegionChange = (region, marker) => {
    setRegion(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        region={region}
        onRegionChangeComplete={(region) => onRegionChange(region)}
      >
        {markers.map((m) => (
          <Marker
            key={m.name}
            title={m.name}
            description={m.vicinity}
            name="location"
            coordinate={{ latitude: m.location.lat, longitude: m.location.lng }}
          />
        ))}
      </MapView>
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={(input) => setInput(input)}
      />

      <StatusBar style="auto" />
      <Text>
        <Button onPress={regionAndLocation} title="Get location" />
      </Text>
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
  mapView: {
    flex: 1,
    width: 330,
    marginTop: 30,
  },
  textInput: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 10,
    width: 200,
    height: 40,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    textAlign: "center",
  },
});
