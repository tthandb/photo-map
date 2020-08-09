import React, { useState, useEffect, useMemo } from "react";
import { View, Dimensions, StyleSheet, Platform } from "react-native";
import MapView from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import CustomCallout from "./CustomCallout"

const Map = props => {
	const [locations, setLocations] = useState([]);
	const getPermissionAsync = async () => {
		if (Platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};
	useMemo(() => getPermissionAsync(), []);
	const pickImage = async (id) => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!result.cancelled) {
				const newLocations = locations;
				newLocations[id].image = result.uri;
				setLocations(newLocations)
			}

			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};
	const onLongPress = props => {
		console.log(props.nativeEvent.coordinate);
		const newLocations = locations;
		if (props.nativeEvent !== null && props.nativeEvent !== undefined)
			newLocations.push({
				coordinate: props.nativeEvent.coordinate,
				image: null
			});
		setLocations(newLocations);
	};
	useEffect(() => {
		getPermissionAsync();
	}, [])
	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				region={props.location}
				onLongPress={onLongPress}
			>
				{locations.map((location, id) => {
					return (
						<MapView.Marker
							key={id}
							coordinate={location.coordinate}
						>
							<CustomCallout id={id} location={location} handlePickImage={pickImage} />
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
