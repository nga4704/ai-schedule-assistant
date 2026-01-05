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

  // --- TẠO LƯỚI NGÀY ĐÚNG VỚI THỨ ---
  const firstDay = monthDays[0];
  const startWeekday = firstDay.getDay(); // 0=CN ... 6=T7

  // chèn ô trống trước ngày 1
  const grid: (Date | null)[] = [
    ...Array(startWeekday).fill(null),
    ...monthDays,
  ];

  return (
    <View>
      {/* HEADER: THỨ */}
      <View className="weekHeader" style={styles.weekHeader}>
        {weekdays.map((d) => (
          <View key={d} style={styles.headerCell}>
            <Text style={styles.headerText}>{d}</Text>
          </View>
        ))}
      </View>

      {/* GRID NGÀY */}
      <View style={styles.monthGrid}>
        {grid.map((date, idx) => {
          if (!date) {
            // Ô trống
            return <View key={idx} style={styles.monthDay} />;
          }

          const dayTasks = tasks.filter(
            (t) => t.date === date.toISOString().split("T")[0]
          );

          return (
            <View key={idx} style={styles.monthDay}>
              <Text style={styles.monthDayLabel}>{date.getDate()}</Text>

              {dayTasks.map((t) => (
                <View
                  key={t.id}
                  style={[styles.event, { backgroundColor: t.color, marginVertical: 2 }]}
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
    width: `${100 / 7}%`,
    paddingVertical: 6,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "700",
    color: Colors.textSecondary ?? "#555",
  },

  monthGrid: { flexDirection: "row", flexWrap: "wrap" },

  monthDay: {
    width: `${100 / 7}%`,
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 60,
  },

  monthDayLabel: { fontWeight: "700", textAlign: "center", marginBottom: 2 },

  event: { padding: 6, borderRadius: 8 },

  eventText: { fontSize: 12, fontWeight: "700", color: "#000" },
});
