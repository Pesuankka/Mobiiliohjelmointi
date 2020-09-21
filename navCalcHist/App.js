import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import calculator from "./Calculator";
import calcuHistory from "./History";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={calculator} />
        <Stack.Screen name="History" component={calcuHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
