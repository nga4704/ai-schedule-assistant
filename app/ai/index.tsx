// app/ai/index.tsx
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
import { Colors } from "../constants/colors";

const mockSchedule = [
  {
    id: "1",
    start: "08:30",
    end: "09:30",
    title: "Hoàn thành bài tập",
    priority: "high",
  },
  {
    id: "2",
    start: "10:00",
    end: "11:00",
    title: "Ôn tập ghi chú",
    priority: "medium",
  },
  {
    id: "3",
    start: "14:00",
    end: "15:00",
    title: "Họp nhóm",
    priority: "medium",
  },
];

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Lịch AI đề xuất</Text>

        <TouchableOpacity>
          <Feather name="refresh-cw" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tổng quan hôm nay</Text>

        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Công việc</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3h</Text>
            <Text style={styles.statLabel}>Thời gian bận</Text>
          </View>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Timeline AI</Text>

        {mockSchedule.map((item) => (
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
                  item.priority === "high"
                    ? styles.high
                    : styles.medium,
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

      {/* AI Explanation */}
      <View style={[styles.card, styles.aiCard]}>
        <Text style={styles.cardTitle}>🤖 Giải thích từ AI</Text>

        <Text style={styles.aiText}>
          • Công việc ưu tiên cao được sắp xếp vào buổi sáng khi bạn tập trung
          tốt nhất.
        </Text>
        <Text style={styles.aiText}>
          • Các buổi họp được gom vào buổi chiều để tránh gián đoạn.
        </Text>
        <Text style={styles.aiText}>
          • Có khoảng nghỉ giữa các công việc để tránh quá tải.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Tạo lại</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryText}>Áp dụng vào lịch</Text>
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

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  /* Card */
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 14,
    color: Colors.textPrimary,
  },

  /* Overview */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 14,
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

  /* Timeline */
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
    color: Colors.textSecondary,
  },

  timelineContent: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 14,
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
    borderRadius: 10,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  high: {
    backgroundColor: Colors.danger,
  },

  medium: {
    backgroundColor: Colors.warning,
  },

  /* AI */
  aiCard: {
    backgroundColor: Colors.aiBackground,
  },

  aiText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 8,
  },

  /* Actions */
  actions: {
    flexDirection: "row",
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
    fontWeight: "700",
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
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
});
