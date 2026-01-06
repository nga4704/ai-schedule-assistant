// (tabs)/index.tsx
import { router, useFocusEffect } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/colors";
import { getTodayTasks, updateTaskCompleted } from "../services/taskService";
import { Task } from "../types/task";
import { formatFullDateVN } from "../utils/date";

export default function HomeScreen() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      getTodayTasks(user.uid)
        .then(setTasks)
        .finally(() => setLoading(false));
    }, [])
  );


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Lịch hôm nay</Text>
          <Text style={styles.subtitle}>
            {formatFullDateVN(new Date())}
          </Text>

        </View>

        <TouchableOpacity onPress={() => router.push("/profile")}>
          <View style={styles.avatar} />
        </TouchableOpacity>
      </View>

      {/* Today tasks */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hôm nay</Text>

        {loading && <Text>Đang tải...</Text>}

        {!loading && tasks.length === 0 && (
          <Text style={{ color: Colors.textSecondary }}>
            Hôm nay chưa có công việc
          </Text>
        )}

        {tasks.map((task, index) => (
          <View
            key={task.id}
            style={[
              styles.taskItem,
              index === 0 && styles.taskHighlight,
              task.completed && { opacity: 0.5 },
            ]}
          >
            {/* CHECKBOX */}
            <TouchableOpacity
              onPress={async () => {
                const newValue = !task.completed;

                // cập nhật firestore
                await updateTaskCompleted(task.id, newValue);

                // cập nhật lại state local
                setTasks(prev =>
                  prev.map(t =>
                    t.id === task.id ? { ...t, completed: newValue } : t
                  )
                );
              }}
              style={[
                styles.checkbox,
                task.completed && styles.checkboxChecked,
              ]}
            >
              {task.completed && <Text style={styles.checkIcon}>✓</Text>}
            </TouchableOpacity>

            {/* CONTENT */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                router.push({
                  pathname: "/tasks/[id]",
                  params: { id: task.id },
                })
              }

            >
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskTime}>{task.hour}:00</Text>
            </TouchableOpacity>

          </View>
        ))}

      </View>



      {/* AI suggestion */}
      <View style={[styles.card, styles.aiCard]}>
        <Text style={styles.cardTitle}>Trợ lý AI</Text>
        <Text style={styles.aiText}>
          AI có thể tối ưu lịch trình của bạn để tập trung hiệu quả hơn hôm nay.
        </Text>

        <TouchableOpacity
          style={styles.aiButton}
          onPress={() => router.push("/ai")}
        >
          <Text style={styles.aiButtonText}>
            Tự động sắp xếp lịch
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: "500",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.gray200,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    color: Colors.textPrimary,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: Colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    backgroundColor: Colors.card,
  },

  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  checkIcon: {
    color: "#000",
    fontWeight: "900",
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.gray200,
    marginBottom: 12,
  },

  taskHighlight: {
    backgroundColor: Colors.primary,
  },

  taskIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.card,
    marginRight: 14,
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  taskTime: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  aiCard: {
    backgroundColor: Colors.card,
  },

  aiText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 16,
  },

  aiButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  aiButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
});
