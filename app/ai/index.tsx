// app/ai/index.tsx
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AIScreen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleScheduleAI = () => {
    setLoading(true);

    // 🔮 Fake AI response (sau này thay bằng API)
    setTimeout(() => {
      setResult(
        "📅 I’ve reorganized your tasks:\n\n" +
          "• High priority tasks in the morning\n" +
          "• Meetings grouped in the afternoon\n" +
          "• Breaks added between sessions\n\n" +
          "You should feel less overloaded today 💡"
      );
      setLoading(false);
    }, 1200);
  };

  const handlePriorityAI = () => {
    setLoading(true);

    setTimeout(() => {
      setResult(
        "⭐ Task priorities updated:\n\n" +
          "1. Finish assignment (High)\n" +
          "2. Team meeting (Medium)\n" +
          "3. Review notes (Low)\n\n" +
          "Focus on the top task first 🚀"
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Assistant 🤖</Text>
        <Text style={styles.subtitle}>
          Let AI help you plan better
        </Text>
      </View>

      {/* Status Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today Overview</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total tasks</Text>
          <Text style={styles.statValue}>5</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>High priority</Text>
          <Text style={[styles.statValue, { color: "#EF4444" }]}>
            2
          </Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Free time</Text>
          <Text style={[styles.statValue, { color: "#10B981" }]}>
            Available
          </Text>
        </View>
      </View>

      {/* AI Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Actions</Text>

        <TouchableOpacity
          style={styles.aiButton}
          onPress={handleScheduleAI}
          disabled={loading}
        >
          <Feather name="calendar" size={20} color="#fff" />
          <Text style={styles.aiButtonText}>
            AI Schedule My Day
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.aiButton, styles.secondaryButton]}
          onPress={handlePriorityAI}
          disabled={loading}
        >
          <Feather name="star" size={20} color="#fff" />
          <Text style={styles.aiButtonText}>
            AI Prioritize Tasks
          </Text>
        </TouchableOpacity>
      </View>

      {/* AI Result */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>AI Insight</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
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
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#64748B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
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

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  statLabel: {
    fontSize: 15,
    color: "#475569",
  },

  statValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  aiButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 12,
  },

  secondaryButton: {
    backgroundColor: "#7C3AED",
  },

  aiButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },

  resultCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 10,
  },

  resultText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#1E293B",
  },
});
