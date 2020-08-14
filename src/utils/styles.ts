import { Platform } from 'react-native';

// Function that generates shadow for android and ios
export const generateShadow = (elevation: number, opacity = 0.3) => ({
	...Platform.select({
		android: { elevation },
		ios: {
			shadowColor: 'black',
			shadowOffset: { width: 0, height: 0.5 * elevation },
			shadowOpacity: opacity,
			shadowRadius: 0.8 * elevation,
		},
	}),
});
