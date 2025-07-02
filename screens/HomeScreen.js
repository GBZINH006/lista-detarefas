import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    StyleSheet,
    Text,
    Switch,
    Keyboard,
    ToastAndroid,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    LayoutAnimation,
    UIManager,
    TouchableOpacity,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskItem from '../components/TaskItem';
import FilterTabs from '../components/FilterTabs';
import AddTaskButton from '../components/AddTaskButton';

import { ThemeContext } from '../theme/ThemeContext';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
    const { theme, isDark, toggleTheme } = useContext(ThemeContext);

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('Todas');
    const [newTask, setNewTask] = useState('');

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    useEffect(() => {
        (async () => {
            const savedTasks = await AsyncStorage.getItem('@tasks');
            if (savedTasks) setTasks(JSON.parse(savedTasks));
        })();

        Notifications.requestPermissionsAsync();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    }, [tasks]);

    const scheduleNotification = async (text, time) => {
        if (time <= new Date()) return; // Só agenda se for futuro

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Lembrete de Tarefa',
                body: `Hora de: ${text}`,
            },
            trigger: time,
        });
    };

    const addTask = () => {
        if (!newTask.trim()) {
            ToastAndroid.show('Digite uma tarefa válida!', ToastAndroid.SHORT);
            return;
        }

        if (!startTime || !endTime) {
            ToastAndroid.show('Escolha horário de início e término!', ToastAndroid.SHORT);
            return;
        }

        if (endTime <= startTime) {
            ToastAndroid.show('O horário de término deve ser depois do início!', ToastAndroid.SHORT);
            return;
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        const task = {
            id: Date.now().toString(),
            text: newTask.trim(),
            done: false,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
        };

        setTasks(prev => [...prev, task]);
        scheduleNotification(task.text, startTime);

        setNewTask('');
        setStartTime(null);
        setEndTime(null);
        Keyboard.dismiss();
        ToastAndroid.show('Tarefa adicionada!', ToastAndroid.SHORT);
    };

    const toggleDone = id => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
        ToastAndroid.show('Tarefa atualizada!', ToastAndroid.SHORT);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'Pendentes') return !task.done;
        if (filter === 'Concluídas') return task.done;
        return true;
    });

    const formatTime = (isoString) => {
        if (!isoString) return '--:--';
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.text }]}>easyTarefa</Text>
                        <View style={styles.switchRow}>
                            <Text style={{ color: theme.text }}>Dark Mode</Text>
                            <Switch value={isDark} onValueChange={toggleTheme} />
                        </View>
                    </View>

                    <TextInput
                        placeholder="Digite uma nova tarefa"
                        placeholderTextColor={theme.text + '80'}
                        style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                        value={newTask}
                        onChangeText={setNewTask}
                        onSubmitEditing={addTask}
                        returnKeyType="done"
                    />

                    <View style={styles.timePickers}>
                        <TouchableOpacity
                            onPress={() => setShowStartPicker(true)}
                            style={[styles.timeButton, { borderColor: theme.primary }]}
                        >
                            <Text style={{ color: theme.text }}>
                                Início: {startTime ? formatTime(startTime.toISOString()) : '--:--'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowEndPicker(true)}
                            style={[styles.timeButton, { borderColor: theme.primary }]}
                        >
                            <Text style={{ color: theme.text }}>
                                Término: {endTime ? formatTime(endTime.toISOString()) : '--:--'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showStartPicker && (
                        <DateTimePicker
                            value={startTime || new Date()}
                            mode="time"
                            is24Hour
                            onChange={(event, selectedDate) => {
                                setShowStartPicker(false);
                                if (selectedDate) setStartTime(selectedDate);
                            }}
                        />
                    )}

                    {showEndPicker && (
                        <DateTimePicker
                            value={endTime || new Date()}
                            mode="time"
                            is24Hour
                            onChange={(event, selectedDate) => {
                                setShowEndPicker(false);
                                if (selectedDate) setEndTime(selectedDate);
                            }}
                        />
                    )}

                    <FilterTabs filter={filter} setFilter={setFilter} theme={theme} />

                    <FlatList
                        data={filteredTasks}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TaskItem task={item} onToggle={toggleDone} theme={theme} />
                        )}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                    />

                    <AddTaskButton onPress={addTask} theme={theme} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
    },
    input: {
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 10,
    },
    timePickers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    timeButton: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1.5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
});
