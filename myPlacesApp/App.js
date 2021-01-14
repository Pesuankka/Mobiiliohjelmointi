import * as React from 'react';
import AdressSaver from './Components/Adress'
import MapApp from './Components/Map'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function App(props) {
  const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="My Places">
          <Stack.Screen name="My Places" component={AdressSaver} />
          <Stack.Screen name="Map" component={MapApp} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;