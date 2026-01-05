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
import { Colors } from "../../constants/colors";

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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather
            name="arrow-left"
            size={22}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.title}>AI Schedule</Text>

        <TouchableOpacity>
          <Feather
            name="refresh-cw"
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today overview</Text>

        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3h</Text>
            <Text style={styles.statLabel}>
              Scheduled
            </Text>
          </View>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI timeline</Text>

        {mockSchedule.map((item) => (
          <View
            key={item.id}
            style={styles.timelineItem}
          >
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
                <Text
                  style={styles.priorityText}
                >
                  {item.priority.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* AI Explanation */}
      <View
        style={[styles.card, styles.aiCard]}
      >
        <Text style={styles.cardTitle}>
          🤖 AI explanation
        </Text>

        <Text style={styles.aiText}>
          • High priority tasks are scheduled
          earlier when your focus is strongest.
        </Text>
        <Text style={styles.aiText}>
          • Meetings are grouped in the
          afternoon.
        </Text>
        <Text style={styles.aiText}>
          • Breaks are left between tasks to
          avoid overload.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryText}>
            Regenerate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryText}>
            Apply to calendar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    color: Colors.textPrimary,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 14,
    color: Colors.textPrimary,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textSecondary,
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
    fontSize: 13,
    color: Colors.textMuted,
  },

  timelineContent: {
    flex: 1,
    backgroundColor: Colors.gray100,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.background,
  },

  high: {
    backgroundColor: Colors.danger,
  },

  medium: {
    backgroundColor: Colors.warning,
  },

  aiCard: {
    backgroundColor: Colors.gray100,
  },

  aiText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginLeft: 10,
  },

  primaryText: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.gray300,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 10,
  },

  secondaryText: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
});
