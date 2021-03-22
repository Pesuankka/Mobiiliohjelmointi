import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { HomeScreen } from "./HomeComponent";
import { FavScreen } from "./FavoriteComponent";
import { SearchScreen } from "./SearchComponents";
import { IngredientScreen } from "./IngredientsComponent";

const { Navigator, Screen } = createBottomTabNavigator();

//ICONS

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const ShakeIcon = (props) => <Icon {...props} name="shake-outline" />;
const IngredientIcon = (props) => (
  <Icon {...props} name="shopping-bag-outline" />
);

const HomeNavigator = () => (
  <Navigator headerMode="none" tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Fav" component={FavScreen} />
    <Screen name="Search" component={SearchScreen} />
    <Screen name="Ingredients" component={IngredientScreen} />
  </Navigator>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={HomeIcon} title="Home" />
    <BottomNavigationTab icon={ShakeIcon} title="Favourites" />
    <BottomNavigationTab icon={SearchIcon} title="Search" />
    <BottomNavigationTab icon={IngredientIcon} title="Shopping List" />
  </BottomNavigation>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
