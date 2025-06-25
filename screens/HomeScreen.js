import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function HomeScreen({ navigation, tasks, setTasks }) {
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskCard, item.completed && styles.taskCompleted]}
      onPress={() => navigation.navigate("TaskDetails", { task: item })}
    >
      <Text
        style={[styles.taskTitle, item.completed && styles.textStrikethrough]}
      >
        {item.title}
      </Text>

      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => toggleTaskStatus(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.completed ? "⛔ Desmarcar" : "✅ Concluir"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa adicionada.</Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  taskCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  taskCompleted: {
    backgroundColor: "#d1f7c4",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  textStrikethrough: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  completeButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#2980b9",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
