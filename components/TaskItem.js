import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

export default function TaskItem({ task, onToggle, theme }) {
    return (
        <MotiView
            from={{ opacity: 1, translateX: 0 }}
            animate={{ opacity: task.done ? 0.5 : 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -100 }}
            style={[styles.container, { backgroundColor: theme.card, shadowColor: theme.shadow }]}
        >
            <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.touch}>
                <Text style={[styles.text, { color: task.done ? '#999' : theme.text, textDecorationLine: task.done ? 'line-through' : 'none' }]}>
                    {task.text}
                </Text>
            </TouchableOpacity>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 6,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    touch: {
        flex: 1,
    },
    text: {
        fontSize: 16,
    },
});
