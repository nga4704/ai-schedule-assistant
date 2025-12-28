// app/calendar/index.tsx
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const hours = Array.from({ length: 12 }, (_, i) => i + 8);

export default function CalendarScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.date}>📅 26 Dec 2025</Text>
      </View>

      {/* Timeline */}
      {hours.map((hour) => (
        <View key={hour} style={styles.timeRow}>
          <Text style={styles.hourText}>{hour}:00</Text>

          <View style={styles.slot}>
            {hour === 9 && (
              <View style={styles.event}>
                <Text style={styles.eventText}>
                  Finish assignment
                </Text>
              </View>
            )}

            {hour === 14 && (
              <View style={styles.eventAlt}>
                <Text style={styles.eventText}>
                  Team meeting
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
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

  date: {
    marginTop: 6,
    fontSize: 16,
    color: "#64748B",
  },

  timeRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  hourText: {
    width: 60,
    fontSize: 14,
    color: "#64748B",
  },

  slot: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: "#E5E7EB",
    paddingLeft: 12,
    minHeight: 50,
  },

  event: {
    backgroundColor: "#DBEAFE",
    padding: 12,
    borderRadius: 12,
  },

  eventAlt: {
    backgroundColor: "#DCFCE7",
    padding: 12,
    borderRadius: 12,
  },

  eventText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
});
