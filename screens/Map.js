import React, { useCallback, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const Map = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();

  props.navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={savePickedLocationHandler}
      >
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  });

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCordinates;

  if (selectedLocation) {
    markerCordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCordinates && (
        <Marker title="Picked Location" coordinate={markerCordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default Map;
