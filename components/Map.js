import React, { useState, useEffect } from "react";
import { View, Dimensions, Button, Text, StyleSheet, Image } from "react-native";
import Lightbox from 'react-native-lightbox';
import MapView from "react-native-maps";
import { Callout } from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { getPermissionsAsync } from "expo-location";

const Map = props => {
	const [locations, setLocations] = useState([]);
	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};
	_pickImage = async (id) => {
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
		} catch (E) {
			console.log(E);
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
		getPermissionsAsync();
	}, [])
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
							coordinate={element.coordinate}
						>
							<Callout tooltip={false}
								alphaHitTest={true}>
								<Text>Marker {id}</Text>
								<Button title="Pick an image from camera roll" onPress={() => _pickImage(id)} />
								<Lightbox navigator={navigator}>
									{element.image && <Image source={{ uri: element.image }} style={{ width: 100, height: 100 }} />}
								</Lightbox>
							</Callout>
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
