import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FilterTabs({ filter, setFilter, theme }) {
    const tabs = ['Todas', 'Pendentes', 'Concluídas'];

    return (
        <View style={styles.container}>
            {tabs.map(tab => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => setFilter(tab)}
                    style={[styles.tab, filter === tab && { borderBottomColor: theme.primary, borderBottomWidth: 2 }]}
                >
                    <Text style={[styles.text, { color: filter === tab ? theme.primary : theme.text }]}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
