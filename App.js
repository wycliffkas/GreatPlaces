import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { init } from "./helpers/db";
import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/reducers/places";

export default function App() {
  init().then(() => {
    console.log("Initialized database")
  }).catch(err => {
    console.log("Initialized database failed")
    console.log(err)
  });

  const rootReducer = combineReducers({
    places: placesReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
