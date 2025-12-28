import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";

/* -----------------------------
 * Mock data
 * ----------------------------- */
const hours = Array.from({ length: 12 }, (_, i) => i + 8);

const mockTasks = [
  {
    id: "1",
    title: "Finish assignment",
    hour: 9,
    color: Colors.primary,
  },
  {
    id: "2",
    title: "Team meeting",
    hour: 14,
    color: Colors.gray200,
  },
];

/* -----------------------------
 * Screen
 * ----------------------------- */
export default function CalendarScreen() {
  const [viewMode, setViewMode] = useState<
    "day" | "week" | "month"
  >("day");

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Calendar</Text>
            <Text style={styles.subtitle}>📅 26 Dec 2025</Text>
          </View>
        </View>

        {/* View mode switch */}
        <View style={styles.modeSwitch}>
          {["day", "week", "month"].map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                viewMode === mode &&
                  styles.modeButtonActive,
              ]}
              onPress={() =>
                setViewMode(mode as any)
              }
            >
              <Text
                style={[
                  styles.modeText,
                  viewMode === mode &&
                    styles.modeTextActive,
                ]}
              >
                {mode.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {viewMode === "day" && (
          <View style={styles.timeline}>
            {hours.map((hour) => {
              const task = mockTasks.find(
                (t) => t.hour === hour
              );

              return (
                <View key={hour} style={styles.timeRow}>
                  <Text style={styles.hourText}>
                    {hour}:00
                  </Text>

                  <View style={styles.slot}>
                    {task && (
                      <View
                        style={[
                          styles.event,
                          {
                            backgroundColor:
                              task.color,
                          },
                        ]}
                      >
                        <Text
                          style={styles.eventText}
                        >
                          {task.title}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {viewMode === "week" && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Week view (coming soon)
            </Text>
          </View>
        )}

        {viewMode === "month" && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Month view (coming soon)
            </Text>
          </View>
        )}
      </ScrollView>

      {/* FAB - Create task */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          router.push("/tasks/create")
        }
      >
        <Feather
          name="plus"
          size={24}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  );
}

/* -----------------------------
 * Styles
 * ----------------------------- */
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: Colors.textSecondary,
  },

  /* Mode switch */
  modeSwitch: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 6,
    marginBottom: 24,
  },

  modeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  modeButtonActive: {
    backgroundColor: Colors.primary,
  },

  modeText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
  },

  modeTextActive: {
    color: "#000",
  },

  /* Timeline */
  timeline: {
    marginBottom: 80,
  },

  timeRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  hourText: {
    width: 60,
    fontSize: 14,
    color: Colors.textSecondary,
  },

  slot: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: Colors.border,
    paddingLeft: 12,
    minHeight: 44,
  },

  event: {
    padding: 14,
    borderRadius: 14,
  },

  eventText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },

  /* Placeholder */
  placeholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },

  /* FAB */
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
