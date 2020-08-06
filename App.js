// import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, SafeAreaView } from "react-native";
// import * as Location from "expo-location";

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   });

//   let text = "Waiting..";
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>{text}</Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
export default class App extends React.Component {
  render() {
    return (
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      // <View>
      //   <Text>Binh</Text>
      // </View>
    );
  }
}
