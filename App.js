import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import TaskDetailsScreen from "./screens/TaskDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const [tasks, setTasks] = useState([]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: "#3498db" },
                    headerTintColor: "#fff",
                }}
            >
                <Stack.Screen name="Home">
                    {(props) => (
                        <HomeScreen {...props} tasks={tasks} setTasks={setTasks} />
                    )}
                </Stack.Screen>
                <Stack.Screen name="AddTask">
                    {(props) => (
                        <AddTaskScreen {...props} tasks={tasks} setTasks={setTasks} />
                    )}
                </Stack.Screen>
                <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}