import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks_data';

export const saveTasks = async (tasks) => {
    try {
        const json = JSON.stringify(tasks);
        await AsyncStorage.setItem(TASKS_KEY, json);
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
    }
};

export const loadTasks = async () => {
    try {
        const json = await AsyncStorage.getItem(TASKS_KEY);
        return json != null ? JSON.parse(json) : [];
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        return [];
    }
};
