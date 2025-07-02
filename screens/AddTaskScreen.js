// screens/AddTaskScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    Appearance,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { lightTheme, darkTheme } from '../theme';

export default function AddTaskScreen({ navigation, setTasks }) {
    const [text, setText] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const scheduleNotification = async (title, date) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: '🔔 easyTarefa',
                body: title,
            },
            trigger: {
                date,
            },
        });
    };

    const handleAdd = () => {
        if (!text.trim()) return;

        const newTask = {
            id: Date.now().toString(),
            text,
            done: false,
            startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setTasks(prev => [...prev, newTask]);
        scheduleNotification(`Hora de começar: ${text}`, startTime);

        setText('');
        Keyboard.dismiss();
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Nova Tarefa</Text>

            <TextInput
                style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
                placeholder="Descreva a tarefa..."
                placeholderTextColor={theme.text + '66'}
                value={text}
                onChangeText={setText}
            />

            <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.timeBtn}>
                <Text style={{ color: theme.text }}>🕓 Início: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.timeBtn}>
                <Text style={{ color: theme.text }}>🕗 Término: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>

            {showStartPicker && (
                <DateTimePicker
                    value={startTime}
                    mode="time"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(e, selectedDate) => {
                        setShowStartPicker(false);
                        if (selectedDate) setStartTime(selectedDate);
                    }}
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    value={endTime}
                    mode="time"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(e, selectedDate) => {
                        setShowEndPicker(false);
                        if (selectedDate) setEndTime(selectedDate);
                    }}
                />
            )}

            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={handleAdd}
            >
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    timeBtn: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        alignItems: 'center'
    },
    button: {
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
