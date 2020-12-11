import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;

  const apiKey = ENV().googleApiKey

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}&key=${apiKey}`;
  }
  return (
    <TouchableOpacity style={{ ...styles.mapTouchableOpacity, ...props.style }} onPress={props.onPress}>
      {props.location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
