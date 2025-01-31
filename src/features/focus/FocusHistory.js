import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
	return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
	const clearHistory = () => {
		onClear();
	};

	return (
		<>
			<SafeAreaView
				style={{
					flex: 0.7,
					alignItems: 'center'
				}}
			>
				{!!focusHistory.length && (
					<View>
						<Text style={styles.title}>Thing's we have focused on:</Text>
						<FlatList
							style={{ flex: 1 }}
							contentContainerStyle={{ flex: 1, alignItems: 'center' }}
							data={focusHistory}
							renderItem={HistoryItem}
						/>
						<View style={styles.clearContainer}>
							<RoundedButton
								size={75}
								title="Clear"
								onPress={() => {
									onClear();
								}}
							/>
						</View>
					</View>
				)}
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	historyItem: (status) => ({
		color: status > 1 ? 'red' : 'green',
		fontSize: fontSizes.md
	}),
	title: {
        flex:0.1,
		color: 'white',
		fontSize: fontSizes.lg
	},
	clearContainer: {
		alignItems: 'center',
		padding: spacing.md
	}
});
