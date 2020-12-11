import React, {useEffect} from "react";
import { FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import PlaceItem from "../components/PlaceItem";
import HeaderButton from "../components/ui/HeaderButton";
import {useDispatch, useSelector} from "react-redux"
import * as placesActions from "../store/actions/places"

const PlacesList = (props) => {
  props.navigation.setOptions({
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            props.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  });

  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlacesList;
