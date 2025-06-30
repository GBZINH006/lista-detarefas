import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

export default function AddTaskButton({ onPress, theme }) {
    return (
        <MotiView
            from={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ type: 'timing', duration: 800, loop: true, repeatReverse: true }}
            style={[styles.container, { backgroundColor: theme.primary }]}
        >
            <TouchableOpacity onPress={onPress} style={styles.touch}>
                <Text style={styles.text}>+ Nova Tarefa</Text>
            </TouchableOpacity>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 25,
        alignSelf: 'center',
    },
    touch: {
        flex: 1,
    },
    text: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center',
    },
});
