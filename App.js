// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import { loadTasks, saveTasks } from './utils/storage';

const Stack = createNativeStackNavigator();

function Document() {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.documentContainer, { backgroundColor: theme.card }]}>
            <Text style={[styles.documentText, { color: theme.text }]}>
                Esse é o easyTarefa, um app pra organizar suas tarefas com tema claro e escuro.
                Você pode adicionar tarefas, marcar como feitas, definir horários e receber notificações.
            </Text>
        </View>
    );
}

export default function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks().then(setTasks);
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home">
                    {(props) => <HomeScreen {...props} tasks={tasks} setTasks={setTasks} />}
                </Stack.Screen>
                <Stack.Screen name="AddTask">
                    {(props) => <AddTaskScreen {...props} setTasks={setTasks} />}
                </Stack.Screen>
                <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


