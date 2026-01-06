import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";
import CalendarDayView, { Task } from "../../components/CalendarDayView";
import CalendarMonthView from "../../components/CalendarMonthView";
import CalendarWeekView from "../../components/CalendarWeekView";
import { expandTaskByRepeat } from "../../helpers/repeatExpand";
import { getTasksOfUser } from "../../services/taskQueryService";

/* ===== helpers ===== */

function formatDateLocal(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${d}-${m}-${y}`;
}

function formatMonthTitle(date: Date) {
  const m = date.toLocaleString("vi-VN", { month: "long" });
  return `${m.charAt(0).toUpperCase() + m.slice(1)} ${date.getFullYear()}`;
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
  const [viewMode, setViewMode] =
    useState<"day" | "week" | "month">("day");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  function onChangeDate(_: any, date?: Date) {
    setShowPicker(false);
    if (date) setSelectedDate(date);
  }

  useFocusEffect(
    React.useCallback(() => {
      let active = true;

      async function load() {
        setLoading(true);

        const firestoreTasks = await getTasksOfUser();

        const rangeStart = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1
        );
        const rangeEnd = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          0
        );

        const expanded = firestoreTasks.flatMap((t) =>
          expandTaskByRepeat(t, rangeStart, rangeEnd)
        );

        if (active) {
          setTasks(expanded.map(mapFirestoreTaskToCalendar));
          setLoading(false);
        }
      }

      load();
      return () => {
        active = false;
      };
    }, [selectedDate])
  );

  const tasksOfDay = tasks.filter(
    (t) => t.date === formatDateLocal(selectedDate)
  );

  /* ===== WEEK ===== */

  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(
    selectedDate.getDate() - selectedDate.getDay()
  );

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  /* ===== MONTH ===== */

  const endOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  const monthDays = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) =>
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i + 1
      )
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lịch</Text>
        </View>

        <View style={styles.modeSwitch}>
          {(["day", "week", "month"] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                viewMode === mode && styles.modeButtonActive,
              ]}
              onPress={() => setViewMode(mode)}
            >
              <Text
                style={[
                  styles.modeText,
                  viewMode === mode && styles.modeTextActive,
                ]}
              >
                {mode === "day"
                  ? "NGÀY"
                  : mode === "week"
                  ? "TUẦN"
                  : "THÁNG"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {loading && <Text>Đang tải công việc...</Text>}

        {/* ===== DAY ===== */}
        {!loading && viewMode === "day" && (
          <View style={{ marginBottom: 16 }}>
            <View style={styles.rowBetween}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate() - 1
                    )
                  )
                }
                style={styles.navBtn}
              >
                <Feather name="chevron-left" size={22} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <Text style={{ fontWeight: "800" }}>
                  {formatDateLocal(selectedDate)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate() + 1
                    )
                  )
                }
                style={styles.navBtn}
              >
                <Feather name="chevron-right" size={22} />
              </TouchableOpacity>
            </View>

            <CalendarDayView tasks={tasksOfDay} />
          </View>
        )}

        {/* ===== WEEK ===== */}
        {!loading && viewMode === "week" && (
          <View style={{ marginBottom: 16 }}>
            <View style={styles.rowBetween}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate() - 7
                    )
                  )
                }
                style={styles.navBtn}
              >
                <Feather name="chevron-left" size={22} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <Text style={{ fontWeight: "800" }}>
                  {formatDateLocal(weekDates[0])} —{" "}
                  {formatDateLocal(weekDates[6])}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate() + 7
                    )
                  )
                }
                style={styles.navBtn}
              >
                <Feather name="chevron-right" size={22} />
              </TouchableOpacity>
            </View>

            <CalendarWeekView tasks={tasks} weekDates={weekDates} />
          </View>
        )}

        {/* ===== MONTH ===== */}
        {!loading && viewMode === "month" && (
          <View style={{ marginBottom: 16 }}>
            <View style={styles.rowBetween}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() - 1,
                      1
                    )
                  )
                }
                style={styles.navBtn}
              >
                <Feather name="chevron-left" size={22} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <Text style={{ fontWeight: "800" }}>
                  {formatMonthTitle(selectedDate)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      1
                    )
                  )
                }
                style={styles.navBtn}
              >
                <Feather name="chevron-right" size={22} />
              </TouchableOpacity>
            </View>

            <CalendarMonthView
              tasks={tasks}
              monthDays={monthDays}
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("../tasks/create")}
      >
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

  modeText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  modeTextActive: { color: "#000" },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  navBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
  },

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
