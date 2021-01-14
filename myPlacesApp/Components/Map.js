import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker } from "react-native-maps";



const baseUrl =
  "http://www.mapquestapi.com/geocoding/v1/address?key=URVhtwoo3uDADaTfCucb8YVFgTKWukIE&location=";

function MapApp({route}) {
  const {itemId, itemPlaces} = route.params;
  const [region, setRegion] = useState({
    latitude: 53.41058,
    longitude: -2.97794,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [marker, setMarker] = useState("");
  
  

  const getLocation = () => {
    
    
    const url = baseUrl + itemPlaces;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        mapRegionAttributes(json.results[0].locations[0].latLng);
        setMarker(json.results[0].locations[0].latLng);
      })
      .catch((error) => alert(error));
  };

  const mapRegionAttributes = (fetchedRegion) => {
    let region = {
      latitude: Number(fetchedRegion.lat),
      longitude: Number(fetchedRegion.lng),
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    };
    setRegion(region);
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
        <Marker coordinate={region}></Marker>
      </MapView>
      <StatusBar style="auto" />
      <Text>
        <Button onPress={getLocation} title="Show" />
      </Text>
    </View>
  );
}

export default MapApp;

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
