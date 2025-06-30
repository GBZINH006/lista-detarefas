import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';

export default function AddTaskScreen({ navigation, setTasks }) {
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        if (title.trim()) {
            setTasks(prev => [...prev, { title, completed: false }]);
            setTitle('');
            Keyboard.dismiss();
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Digite o título da tarefa"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Button title="Salvar Tarefa" onPress={handleAdd} color="#3498db" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
});
