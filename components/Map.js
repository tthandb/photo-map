import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle} />
    </View>
  );
};

export default Map;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
