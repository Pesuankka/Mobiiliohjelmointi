import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const LATITUDE = 60.200692
const LONGITUDE = 24.934302
const LAT_DELTA = 0.02
const LONG_DELTA = 0.02

const baseUrl =
  "http://www.mapquestapi.com/geocoding/v1/address?key=URVhtwoo3uDADaTfCucb8YVFgTKWukIE&location=";
  
export default function App() {
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LAT_DELTA,
    longitudeDelta: LONG_DELTA});
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [input, setInput] = useState("");
  const [marker, setMarker] = useState("");

  useEffect(() => {
    setRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LAT_DELTA,
      longitudeDelta: LONG_DELTA})
    getDeviceAndSetInitialLoc()
    getLocation()
  }, []);

   const getDeviceAndSetInitialLoc = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      const device_location = await Location.getCurrentPositionAsync({});
      mapRegionAttributes({
        lat: device_location.coords.latitude ,
        lng:  device_location.coords.longitude,
      })
      console.log(device_location)
  };

   const getLocation = () => {
    const url = baseUrl + input;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setInput(json.results[0].providedLocation.location);
        if (json.results[0].locations[0] != undefined){
          mapRegionAttributes(json.results[0].locations[0].latLng)
          setMarker(json.results[0].locations[0].latLng)
        }
     
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
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={(input) => setInput(input)}
      />

      <StatusBar style="auto" />
      <Text>
        <Button onPress={getLocation} title="Get location" />
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
