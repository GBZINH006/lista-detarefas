import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, Switch, Keyboard, ToastAndroid, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskItem from '../components/TaskItem';
import AddTaskButton from '../components/AddTaskButton';
import FilterTabs from '../components/FilterTabs';

import { lightTheme, darkTheme } from '../theme';

export default function HomeScreen() {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState(colorScheme === 'dark' ? darkTheme : lightTheme);

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('Todas');
    const [newTask, setNewTask] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

    // Load tasks from storage
    useEffect(() => {
        (async () => {
            const savedTasks = await AsyncStorage.getItem('@tasks');
            if (savedTasks) setTasks(JSON.parse(savedTasks));
        })();
    }, []);

    // Save tasks on change
    useEffect(() => {
        AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Toggle dark mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        setTheme(!isDarkMode ? darkTheme : lightTheme);
    };

    // Add new task
    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks(prev => [...prev, { id: Date.now().toString(), text: newTask.trim(), done: false }]);
        setNewTask('');
        Keyboard.dismiss();
        ToastAndroid.show('Tarefa adicionada!', ToastAndroid.SHORT);
    };

    // Toggle task done
    const toggleDone = (id) => {
        setTasks(prev => prev.map(task => (task.id === id ? { ...task, done: !task.done } : task)));
        ToastAndroid.show('Tarefa atualizada!', ToastAndroid.SHORT);
    };

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (filter === 'Pendentes') return !task.done;
        if (filter === 'Concluídas') return task.done;
        return true;
    });

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>easyTarefa</Text>
                <View style={styles.switchRow}>
                    <Text style={{ color: theme.text }}>Dark Mode</Text>
                    <Switch value={isDarkMode} onValueChange={toggleTheme} />
                </View>
            </View>

            <TextInput
                placeholder="Digite uma nova tarefa"
                placeholderTextColor={theme.text + '99'}
                style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                value={newTask}
                onChangeText={setNewTask}
                onSubmitEditing={addTask}
                returnKeyType="done"
            />

            <AddTaskButton onPress={addTask} theme={theme} />

            <FilterTabs filter={filter} setFilter={setFilter} theme={theme} />

            <FlatList
                data={filteredTasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TaskItem task={item} onToggle={toggleDone} theme={theme} />}
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
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
        marginBottom: 15,
    },
});
