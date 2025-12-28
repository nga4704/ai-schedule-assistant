// app/index.tsx
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

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today’s schedule</Text>
          <Text style={styles.subtitle}>Thursday</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/profile")}
        >
        <View style={styles.avatar} />
        </TouchableOpacity>
      </View>

      {/* Today tasks */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today</Text>

        <View style={styles.taskItem}>
          <View style={styles.taskIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>Wake up early</Text>
            <Text style={styles.taskTime}>7:00 AM</Text>
          </View>
        </View>

        <View style={[styles.taskItem, styles.taskHighlight]}>
          <View style={styles.taskIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>Morning yoga</Text>
            <Text style={styles.taskTime}>8:00 AM</Text>
          </View>
        </View>
      </View>

      {/* AI suggestion */}
      <View style={[styles.card, styles.aiCard]}>
        <Text style={styles.cardTitle}>AI assistant</Text>
        <Text style={styles.aiText}>
          I can optimize your schedule for better focus today.
        </Text>

        <TouchableOpacity
          style={styles.aiButton}
          onPress={() => router.push("/schedule")}
        >
          <Text style={styles.aiButtonText}>Auto schedule</Text>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: "600",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.gray200,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    color: Colors.textPrimary,
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.gray200,
    marginBottom: 12,
  },

  taskHighlight: {
    backgroundColor: Colors.primary,
  },

  taskIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.card,
    marginRight: 14,
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  taskTime: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  aiCard: {
    backgroundColor: Colors.card,
  },

  aiText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 16,
  },

  aiButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  aiButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
});
