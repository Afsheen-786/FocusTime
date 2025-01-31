import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/focus/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const STATUES = {
	COMPLETED: 1,
	CANCELLED: 2
};

export default function App() {
	console.log('hey git');
	const [ focusSubject, setFocusSubject ] = useState(null);
	const [ focusHistory, setFocusHistory ] = useState([]);

	const addFocusHistorySubjectWithStatus = (subject, status) => {
		setFocusHistory([ ...focusHistory, { key: String(focusHistory.length + 1), subject, status } ]);
	};
	const onClear = () => {
		setFocusHistory([]);
	};

	const saveFocusHistory = async () => {
		try {
			await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
		} catch (e) {
			console.log(e);
		}
	};

	const loadFocusHistory = async () => {
		try {
			const history = await AsyncStorage.getItem('focusHistory');

			if (history && JSON.parse(history).length) {
				setFocusHistory(JSON.parse(history));
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		loadFocusHistory();
	}, []);

	useEffect(
		() => {
			saveFocusHistory();
		},
		[ focusHistory ]
	);

	return (
		<View style={styles.container}>
			{focusSubject ? (
				<Timer
					focusSubject={focusSubject}
					onTimerEnd={() => {
						addFocusHistorySubjectWithStatus(focusSubject, STATUES.COMPLETED);
						setFocusSubject(null);
					}}
					clearSubject={() => {
						addFocusHistorySubjectWithStatus(focusSubject, STATUES.CANCELLED);
						setFocusSubject(null);
					}}
				/>
			) : (
				<View style={{ flex: 1 }}>
					<Focus addSubject={setFocusSubject} />
					<FocusHistory focusHistory={focusHistory} onClear={onClear} />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
		backgroundColor: colors.darkBlue
	}
});
