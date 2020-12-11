import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetail = (props) => {
  props.navigation.setOptions({
    headerTitle: props.route.params.placeTitle,
  });
  return (
    <View style={styles.container}>
      <Text>PlaceDetail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaceDetail;
