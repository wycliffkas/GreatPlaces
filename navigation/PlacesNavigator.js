import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import Map from "../screens/Map";
import NewPlace from "../screens/NewPlace";
import PlaceDetail from "../screens/PlaceDetail";
import PlacesList from "../screens/PlacesList";
import React from "react"

const Stack = createStackNavigator();

const defaultOptions = {
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  }
};

const PlacesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name="Places" component={PlacesList} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
      <Stack.Screen name="NewPlace" component={NewPlace} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default PlacesNavigator;
