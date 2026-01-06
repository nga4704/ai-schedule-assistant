// app/ai/index.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";
import { AIScheduleItem, getAISchedule } from "../services/aiService";
import { getTodayTasks } from "../services/taskHelpers";
import { detectOverload } from "../utils/scheduleHelpers";

export default function ScheduleScreen() {
  const [todayTasks, setTodayTasks] = useState<any[]>([]);
  const [aiSchedule, setAiSchedule] = useState<AIScheduleItem[]>([]);
  const [overload, setOverload] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadTodayTasksAndAISchedule() {
    setLoading(true);
    try {
      const tasks = await getTodayTasks();
      setTodayTasks(tasks);

      setOverload(detectOverload(tasks));

      const suggestions = await getAISchedule(tasks);
      setAiSchedule(suggestions);
    } catch (err) {
      console.error("Load AI schedule failed:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodayTasksAndAISchedule();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Lịch AI đề xuất</Text>

        <TouchableOpacity onPress={loadTodayTasksAndAISchedule}>
          <Feather name="refresh-cw" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {loading && <Text>Đang tải...</Text>}
      {overload && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          ⚠️ Ngày hôm nay quá tải!
        </Text>
      )}

      <View style={styles.card}>
        {aiSchedule.map((item) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{item.start}</Text>
              <Text style={styles.timeText}>{item.end}</Text>
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <View
                style={[
                  styles.priorityBadge,
                  item.priority === "high" ? styles.high : styles.medium,
                ]}
              >
                <Text style={styles.priorityText}>
                  {item.priority === "high" ? "CAO" : "TRUNG BÌNH"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  title: { fontSize: 20, fontWeight: "800", color: Colors.textPrimary },
  card: { backgroundColor: Colors.card, borderRadius: 18, padding: 20, marginBottom: 20 },
  timelineItem: { flexDirection: "row", marginBottom: 16 },
  timeColumn: { width: 70, alignItems: "center" },
  timeText: { fontSize: 13, color: Colors.textSecondary },
  timelineContent: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: { fontSize: 14, fontWeight: "700", color: Colors.textPrimary },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  priorityText: { fontSize: 11, fontWeight: "700", color: "#fff" },
  high: { backgroundColor: Colors.danger },
  medium: { backgroundColor: Colors.warning },
});
