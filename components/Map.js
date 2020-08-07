import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import {Callout} from "react-native-maps";

const Map = props => {
	const [locations, setLocations] = useState([]);
	const onLongPress = props => {
		console.log(props.nativeEvent.coordinate);
		const listLocations = locations;
		if (props.nativeEvent !== null && props.nativeEvent !== undefined)
			listLocations.push(props.nativeEvent.coordinate);
		setLocations(listLocations);
	};
	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				region={props.location}
				onLongPress={onLongPress}
			>
				{locations.map((element, id) => {
					return (
						<MapView.Marker
							key={id}
							coordinate={element}
						>
								<Callout tooltip={false}
								alphaHitTest={true}>
									<Text>Marker {id}</Text></Callout>
						</MapView.Marker>
					);
				})}
			</MapView>
		</View>
	);
};

export default Map;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	mapStyle: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
});
