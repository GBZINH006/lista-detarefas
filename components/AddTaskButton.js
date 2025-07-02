import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

export default function AddTaskButton({ onPress, theme }) {
    return (
        <MotiView
            from={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ type: 'timing', duration: 800, loop: true, repeatReverse: true }}
            style={[styles.container, { backgroundColor: theme.primary, shadowColor: theme.shadow }]}
        >
            <TouchableOpacity onPress={onPress} style={styles.touch}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    touch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        lineHeight: 36,
    },
});
