// app/schedule/index.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const mockSchedule = [
  {
    id: "1",
    start: "08:30",
    end: "09:30",
    title: "Finish assignment",
    priority: "high",
  },
  {
    id: "2",
    start: "10:00",
    end: "11:00",
    title: "Review notes",
    priority: "medium",
  },
  {
    id: "3",
    start: "14:00",
    end: "15:00",
    title: "Team meeting",
    priority: "medium",
  },
];

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.title}>AI Schedule</Text>

        <TouchableOpacity>
          <Feather name="refresh-cw" size={22} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today Overview</Text>

        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3h</Text>
            <Text style={styles.statLabel}>Scheduled</Text>
          </View>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Timeline</Text>

        {mockSchedule.map((item) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>
                {item.start}
              </Text>
              <Text style={styles.timeText}>
                {item.end}
              </Text>
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.taskTitle}>
                {item.title}
              </Text>

              <View
                style={[
                  styles.priorityBadge,
                  item.priority === "high"
                    ? styles.high
                    : styles.medium,
                ]}
              >
                <Text style={styles.priorityText}>
                  {item.priority.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* AI Explanation */}
      <View style={[styles.card, styles.aiCard]}>
        <Text style={styles.cardTitle}>🤖 AI Explanation</Text>
        <Text style={styles.aiText}>
          • High priority tasks are scheduled earlier when
          your focus is strongest.
        </Text>
        <Text style={styles.aiText}>
          • Meetings are grouped in the afternoon.
        </Text>
        <Text style={styles.aiText}>
          • Breaks are left between tasks to avoid overload.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>
            Regenerate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryText}>
            Apply to Calendar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: "#0F172A",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 16,
    borderRadius: 14,
    marginRight: 12,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2563EB",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 16,
  },

  timeColumn: {
    width: 70,
    alignItems: "center",
  },

  timeText: {
    fontSize: 14,
    color: "#475569",
  },

  timelineContent: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  high: {
    backgroundColor: "#EF4444",
  },

  medium: {
    backgroundColor: "#F59E0B",
  },

  aiCard: {
    backgroundColor: "#EEF2FF",
  },

  aiText: {
    fontSize: 14,
    color: "#1E3A8A",
    marginBottom: 8,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginLeft: 10,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 10,
  },

  secondaryText: {
    color: "#1E293B",
    fontSize: 15,
    fontWeight: "700",
  },
});
