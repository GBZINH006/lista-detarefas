import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

export default function TaskCard({ task, onToggle, onDelete, onPressDetails, theme }) {
    return (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300 }}
            style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.shadow }]}
        >
            <TouchableOpacity onPress={onToggle} style={{ flex: 1 }}>
                <Text
                    style={[
                        styles.text,
                        { color: task.done ? '#999' : theme.text, textDecorationLine: task.done ? 'line-through' : 'none' },
                    ]}
                >
                    {task.text}
                </Text>
                {/* Exibindo horários */}
                {(task.startTime || task.endTime) && (
                    <Text style={[styles.timeText, { color: theme.primary }]}>
                        {task.startTime ? `Início: ${task.startTime} ` : ''}
                        {task.endTime ? `- Fim: ${task.endTime}` : ''}
                    </Text>
                )}
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onPressDetails}>
                    <Text style={[styles.detail, { color: theme.primary }]}>Ver</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.delete}>X</Text>
                </TouchableOpacity>
            </View>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    text: {
        fontSize: 16,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        marginLeft: 10,
    },
    delete: {
        color: '#e11d48',
        fontWeight: 'bold',
        fontSize: 16,
    },
    detail: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
