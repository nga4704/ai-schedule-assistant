import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

export interface Task {
  id: string;
  title: string;
  date: string;
  hour: number;
  color: string;
}

interface Props {
  tasks: Task[];
}

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function CalendarDayView({ tasks }: Props) {
  return (
    <View style={styles.timeline}>
      {hours.map((hour) => {
        const tasksAtHour = tasks.filter((t) => t.hour === hour);

        return (
          <View key={hour} style={styles.timeRow}>
            <Text style={styles.hourText}>{hour}:00</Text>
            <View style={styles.slot}>
              {tasksAtHour.map((task) => (
                <View
                  key={task.id}
                  style={[styles.event, { backgroundColor: task.color }]}
                >
                  <Text style={styles.eventText}>{task.title}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  timeline: { marginBottom: 80 },
  timeRow: { flexDirection: "row", marginBottom: 18 },
  hourText: { width: 60, color: Colors.textSecondary },
  slot: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: Colors.border,
    paddingLeft: 12,
  },
  event: { padding: 6, borderRadius: 8, marginBottom: 6 },
  eventText: { fontWeight: "700" },
});
