import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/focus/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

export default function App() {
	const [ focusSubject, setFocusSubject ] = useState('gardening');

	return (
		<View style={styles.container}>
			{focusSubject ? (
			<Timer focusSubject={focusSubject} onTimerEnd={()=>{
                 setFocusSubject(null);
			}}/>
			) :(<Focus addSubject={setFocusSubject} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
		backgroundColor: colors.darkBlue
	}
});
