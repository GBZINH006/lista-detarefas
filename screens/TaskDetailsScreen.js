import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Appearance,
} from 'react-native';
import { lightTheme, darkTheme } from '../theme/ThemeContext';
import { MotiView } from 'moti';

export default function TaskDetailsScreen({ route, navigation }) {
    const { task } = route.params;
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 300 }}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <Text style={[styles.title, { color: theme.primary }]}>📋 Detalhes da Tarefa</Text>

            <View style={styles.section}>
                <Text style={[styles.label, { color: theme.text }]}>Descrição:</Text>
                <Text style={[styles.text, { color: theme.text }]}>{task.text}</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.label, { color: theme.text }]}>Status:</Text>
                <Text style={[styles.status, { color: task.done ? '#22c55e' : '#f59e0b' }]}>
                    {task.done ? '✅ Concluída' : '⏳ Pendente'}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>← Voltar</Text>
            </TouchableOpacity>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        borderRadius: 16,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    text: {
        fontSize: 18,
    },
    status: {
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});