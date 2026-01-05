import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors";

import CalendarDayView, { Task } from "../../components/CalendarDayView";
import CalendarMonthView from "../../components/CalendarMonthView";
import CalendarWeekView from "../../components/CalendarWeekView";

import { getTasksOfUser } from "../../services/taskQueryService";

/* ===== helpers ===== */
function formatDateLocal(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function mapFirestoreTaskToCalendar(task: any): Task {
  const start: Date =
    task.startTime?.toDate?.() ?? new Date(task.startTime);

  return {
    id: task.id,
    title: task.title,
    date: formatDateLocal(start),
    hour: start.getHours(),
    color: task.taskColor ?? Colors.primary,
  };
}

/* ===== screen ===== */
export default function CalendarScreen() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [selectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const firestoreTasks = await getTasksOfUser();
      setTasks(firestoreTasks.map(mapFirestoreTaskToCalendar));
      setLoading(false);
    }

    load();
  }, []);

  const tasksOfDay = tasks.filter(
    (t) => t.date === formatDateLocal(selectedDate)
  );

  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

  const monthDays = Array.from({ length: endOfMonth.getDate() }, (_, i) =>
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1)
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Lịch</Text>
          {/* <Text style={styles.subtitle}>📅 {formatDateLocal(selectedDate)}</Text> */}
        </View>

        <View style={styles.modeSwitch}>
          {(["day", "week", "month"] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[styles.modeButton, viewMode === mode && styles.modeButtonActive]}
              onPress={() => setViewMode(mode)}
            >
              <Text
                style={[styles.modeText, viewMode === mode && styles.modeTextActive]}
              >
                {mode === "day" ? "NGÀY" : mode === "week" ? "TUẦN" : "THÁNG"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading && <Text>Đang tải công việc...</Text>}

        {!loading && viewMode === "day" && <CalendarDayView tasks={tasksOfDay} />}
        {!loading && viewMode === "week" && (
          <CalendarWeekView tasks={tasks} weekDates={weekDates} />
        )}
        {!loading && viewMode === "month" && (
          <CalendarMonthView tasks={tasks} monthDays={monthDays} />
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/tasks/create")}>
        <Feather name="plus" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "800", color: Colors.textPrimary },
  subtitle: { marginTop: 6, fontSize: 16, color: Colors.textSecondary },
  modeSwitch: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 6,
    marginBottom: 24,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  modeButtonActive: { backgroundColor: Colors.primary },
  modeText: { fontSize: 13, fontWeight: "700", color: Colors.textSecondary },
  modeTextActive: { color: "#000" },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
