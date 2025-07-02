import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

export default function TaskItem({ task, onToggle, theme }) {
    return (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300 }}
            style={[styles.container, { backgroundColor: theme.card, shadowColor: theme.shadow }]}
        >
            <TouchableOpacity onPress={() => onToggle(task.id)} style={{ flex: 1 }}>
                <Text
                    style={[
                        styles.text,
                        { color: task.done ? '#999' : theme.text, textDecorationLine: task.done ? 'line-through' : 'none' },
                    ]}
                >
                    {task.text}
                </Text>

                {(task.startTime || task.endTime) && (
                    <View style={styles.timeContainer}>
                        <Text style={[styles.timeText, { color: theme.primary }]}>
                            {task.startTime ? `Início: ${formatTime(task.startTime)}` : 'Início: --:--'}
                        </Text>
                        <Text style={[styles.timeText, { color: theme.primary, marginLeft: 15 }]}>
                            {task.endTime ? `Fim: ${formatTime(task.endTime)}` : 'Fim: --:--'}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </MotiView>
    );
}

function formatTime(isoString) {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
    text: {
        fontSize: 16,
    },
    timeContainer: {
        flexDirection: 'row',
        marginTop: 6,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '600',
    },
});
