import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Task } from "./CalendarDayView";

interface Props {
  tasks: Task[];
  weekDates: Date[];
}

const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const hours = Array.from({ length: 24 }, (_, i) => i);

const ROW_HEIGHT = 64;

function formatDateLocal(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${d}-${m}-${y}`;
}

export default function CalendarWeekView({ tasks, weekDates }: Props) {
  const today = new Date().toDateString();

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View style={{ width: 50 }} />

        {weekDates.map((date, idx) => {
          const isToday = date.toDateString() === today;

          return (
            <View key={idx} style={styles.headerDay}>
              <Text style={styles.headerLabel}>{weekDays[date.getDay()]}</Text>

              <View
                style={[styles.dayCircle, isToday && styles.dayCircleActive]}
              >
                <Text
                  style={[styles.dayText, isToday && styles.dayTextActive]}
                >
                  {date.getDate()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* BODY */}
      <ScrollView>
        <View style={styles.body}>
          {/* TIME COLUMN */}
          <View style={styles.timeColumn}>
            {hours.map((h) => (
              <View key={h} style={[styles.timeCell, { height: ROW_HEIGHT }]}>
                <Text style={styles.timeText}>
                  {h.toString().padStart(2, "0")}:00
                </Text>
              </View>
            ))}
          </View>

          {/* DAYS */}
          {weekDates.map((date, dIdx) => {
            const dateKey = formatDateLocal(date);

            return (
              <View key={dIdx} style={styles.dayColumn}>
                {hours.map((hour) => {
                  const hourTasks = tasks.filter(
                    (t) => t.date === dateKey && t.hour === hour
                  );

                  return (
                    <View
                      key={hour}
                      style={[styles.hourCell, { height: ROW_HEIGHT }]}
                    >
                      {hourTasks.map((t) => (
                        <View
                          key={t.id}
                          style={[
                            styles.event,
                            { backgroundColor: t.color },
                          ]}
                        >
                          <Text numberOfLines={1} style={styles.eventText}>
                            {t.title}
                          </Text>
                        </View>
                      ))}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  headerDay: { flex: 1, alignItems: "center" },
  headerLabel: { fontSize: 12, fontWeight: "600", color: Colors.textSecondary },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  dayCircleActive: { backgroundColor: Colors.primary },
  dayText: { fontWeight: "700" },
  dayTextActive: { color: Colors.textPrimary },

  body: { flexDirection: "row" },

  timeColumn: { width: 50 },
  timeCell: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingRight: 6,
  },
  timeText: { fontSize: 11, color: Colors.textSecondary },

  dayColumn: { flex: 1, borderLeftWidth: 1, borderColor: Colors.border },
  hourCell: { borderTopWidth: 1, borderColor: Colors.border, padding: 4 },

  event: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginBottom: 4,
  },
  eventText: { fontSize: 11, fontWeight: "700", color: "#000" },
});
