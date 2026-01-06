import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Task } from "./CalendarDayView";

interface Props {
  tasks: Task[];
  monthDays: Date[];
}

export default function CalendarMonthView({ tasks, monthDays }: Props) {
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const firstDay = monthDays[0];
  const startWeekday = firstDay.getDay();

  const grid: (Date | null)[] = [
    ...Array(startWeekday).fill(null),
    ...monthDays,
  ];

  const tail = (7 - (grid.length % 7)) % 7;
  if (tail > 0) grid.push(...Array(tail).fill(null));

  function toLocalDateString(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${d}-${m}-${y}`;
  }

  const today = new Date();
  const todayKey = toLocalDateString(today);

  return (
    <View>
      {/* HEADER */}
      <View style={styles.weekHeader}>
        {weekdays.map((d) => (
          <View key={d} style={styles.headerCell}>
            <Text style={styles.headerText}>{d}</Text>
          </View>
        ))}
      </View>

      {/* GRID */}
      <View style={styles.monthGrid}>
        {grid.map((date, idx) => {
          if (!date) return <View key={idx} style={styles.monthDay} />;

          const dateKey = toLocalDateString(date);
          const isToday = dateKey === todayKey;
          const dayTasks = tasks.filter((t) => t.date === dateKey);

          return (
            <View key={idx} style={styles.monthDay}>
              <View style={[styles.dayCircle, isToday && styles.todayCircle]}>
                <Text
                  style={[
                    styles.monthDayLabel,
                    isToday && styles.todayText,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>

              {dayTasks.map((t) => (
                <View
                  key={t.id}
                  style={[
                    styles.event,
                    { backgroundColor: t.color, marginVertical: 2 },
                  ]}
                >
                  <Text style={styles.eventText}>{t.title}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weekHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  headerCell: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "700",
    color: Colors.textSecondary ?? "#555",
  },
  monthGrid: { flexDirection: "row", flexWrap: "wrap" },
  monthDay: {
    flexBasis: "14.2857%",
    maxWidth: "14.2857%",
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 68,
    alignItems: "center",
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  todayCircle: { backgroundColor: Colors.primary },
  monthDayLabel: { fontWeight: "700", textAlign: "center" },
  todayText: { color: "#000" },
  event: { padding: 6, borderRadius: 8 },
  eventText: { fontSize: 12, fontWeight: "700", color: "#000" },
});
