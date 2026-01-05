import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

export default function AIScreen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleScheduleAI = () => {
    setLoading(true);
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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Assistant</Text>
        <Text style={styles.subtitle}>
          Let AI help you plan better
        </Text>
      </View>

      {/* Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today overview</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total tasks</Text>
          <Text style={styles.statValue}>5</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>High priority</Text>
          <Text
            style={[
              styles.statValue,
              { color: Colors.danger },
            ]}
          >
            2
          </Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Free time</Text>
          <Text
            style={[
              styles.statValue,
              { color: Colors.success },
            ]}
          >
            Available
          </Text>
        </View>
      </View>

      {/* AI Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI actions</Text>

        <TouchableOpacity
          style={styles.aiButton}
          onPress={handleScheduleAI}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Feather
            name="calendar"
            size={18}
            color={Colors.textPrimary}
          />
          <Text style={styles.aiButtonText}>
            AI schedule my day
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.aiButton,
            styles.secondaryButton,
          ]}
          onPress={handlePriorityAI}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Feather
            name="star"
            size={18}
            color={Colors.textPrimary}
          />
          <Text style={styles.aiButtonText}>
            AI prioritize tasks
          </Text>
        </TouchableOpacity>
      </View>

      {/* AI Result */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>
            AI insight
          </Text>
          <Text style={styles.resultText}>
            {result}
          </Text>
        </View>
      )}
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
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: Colors.textMuted,
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

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  statValue: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  aiButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 12,
  },

  secondaryButton: {
    backgroundColor: Colors.gray200,
  },

  aiButtonText: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 10,
  },

  resultCard: {
    backgroundColor: Colors.gray200,
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },

  resultTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 10,
  },

  resultText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});
