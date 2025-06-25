import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function AddTaskScreen({ navigation, tasks, setTasks }) {
  const [title, setTitle] = useState("");

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert("Erro", "Digite o título da tarefa.");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título da Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar React Native"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#27ae60",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
