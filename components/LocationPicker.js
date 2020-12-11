import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.route.params.pickedLocation

  useEffect(() => {
    if(mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
    }
  }, [mapPickedLocation])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insuffcient permissions!",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getUserLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.latitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map")
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet</Text>
        )}
      </MapPreview>

      <View style={styles.action}>
        <Button
          title="Get your user location"
          color={Colors.primary}
          onPress={getUserLocationHandler}
        />
        <Button
          title="Pick on map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default LocationPicker;
