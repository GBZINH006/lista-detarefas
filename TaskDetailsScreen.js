import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TaskDetailsScreen({ route }) {
    const { task } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.status}>
                Status: {task.completed ? "✅ Concluída" : "⌛ Pendente"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
    status: { fontSize: 18, color: "#555" },
});