import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const Avatar = ({ image, name, location, friends, countries, photos }) => (
	<View style={Styles.root}>
		<View style={Styles.container}>
			<Text style={Styles.name}>{name}</Text>
			<Text style={Styles.location}>{location}</Text>
			<View style={Styles.footer}>
				<View style={Styles.info}>
					<Text style={Styles.number}>{friends || 0}</Text>
					<Text style={Styles.label}>Friends</Text>
				</View>
				<View style={Styles.info}>
					<Text style={Styles.number}>{countries || 0}</Text>
					<Text style={Styles.label}>Countries</Text>
				</View>
				<View style={Styles.info}>
					<Text style={Styles.number}>{photos || 0}</Text>
					<Text style={Styles.label}>Photos</Text>
				</View>
			</View>
		</View>
		<View style={Styles.imageWrapper}>
			<Image style={Styles.image} source={image} />
		</View>
	</View>
);

const Styles = StyleSheet.create({
	root: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: 'transparent',
		paddingTop: 40,
	},

	container: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: 'white',
		paddingHorizontal: 40,
		paddingBottom: 20,
		paddingTop: 60,
		borderRadius: 10,
	},

	imageWrapper: {
		top: 0,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		position: 'absolute',
		backgroundColor: 'white',
		width: 92,
		height: 92,
		borderRadius: 46,
	},

	image: {
		width: 80,
		height: 80,
		borderRadius: 40,
	},

	name: {
		fontSize: 20,
		color: 'black',
		marginBottom: 10,
	},

	location: {
		fontSize: 14,
		color: 'gray',
	},

	footer: {
		width: '100%',
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	info: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	number: {
		fontSize: 18,
		color: 'blue',
		marginBottom: 10,
	},

	label: {
		fontSize: 12,
		color: 'gray',
	},
});
