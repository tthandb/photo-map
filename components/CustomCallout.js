import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Lightbox from "react-native-lightbox";
import { Callout } from "react-native-maps";
const ImageLightBox = ({ uri }) => {
  return (
    <Lightbox underlayColor="white">
      <Image style={styles.image} source={{ uri }} resizeMode="contain" />
    </Lightbox>
  );
};
const CustomCallout = ({ id, location, handlePickImage }) => {
  return (
    <Callout tooltip={false} alphaHitTest={true}>
      <View style={styles.textMarkerWrapper}>
        <Text style={styles.textMarker}>Marker {id}</Text>
      </View>
      {location.image && <ImageLightBox uri={location.image} />}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity>
          <Text style={styles.titleButton} onPress={() => handlePickImage(id)}>
            Pick an image from camera roll
          </Text>
        </TouchableOpacity>
      </View>
    </Callout>
  );
};
const styles = StyleSheet.create({
  image: { flex: 1, height: 100 },
  textMarker: { alignContent: "center", fontWeight: "bold" },
  titleButton: {
    fontWeight: "500",
    color: "rgb(0, 122, 255)",
  },
  textMarkerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: 150,
  },
});
export default CustomCallout;
