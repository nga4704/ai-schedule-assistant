// app/tasks/index.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const mockTasks = [
  {
    id: "1",
    title: "Finish assignment",
    time: "09:00 - 10:00",
    priority: "high",
    done: false,
  },
  {
    id: "2",
    title: "Team meeting",
    time: "14:00 - 15:00",
    priority: "medium",
    done: true,
  },
];

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/tasks/create")}
        >
          <Feather name="plus" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Task list */}
      <FlatList
        data={mockTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.taskTitle,
                  item.done && styles.doneText,
                ]}
              >
                {item.title}
              </Text>

              <Text style={styles.taskTime}>{item.time}</Text>
            </View>

            <View
              style={[
                styles.priorityDot,
                item.priority === "high"
                  ? styles.high
                  : styles.medium,
              ]}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  addButton: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 14,
  },

  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  taskTime: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748B",
  },

  doneText: {
    textDecorationLine: "line-through",
    color: "#94A3B8",
  },

  priorityDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  high: {
    backgroundColor: "#EF4444",
  },

  medium: {
    backgroundColor: "#F59E0B",
  },
});
