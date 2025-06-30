import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskCard({ task, onPressDetails, onComplete }) {
    return (
        <TouchableOpacity
            style={[styles.card, task.completed && styles.completedCard]}
            onPress={onPressDetails}
        >
            <Text
                style={[styles.title, task.completed && styles.textStrikethrough]}
            >
                {task.title}
            </Text>

            <TouchableOpacity
                style={styles.completeButton}
                onPress={onComplete}
            >
                <Text style={styles.buttonText}>
                    {task.completed ? "⛔ Desmarcar" : "✅ Concluir"}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 14,
        marginVertical: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#3498db',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },

    completedCard: {
        backgroundColor: "#d1f7c4",
    },
    title: {
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
});
