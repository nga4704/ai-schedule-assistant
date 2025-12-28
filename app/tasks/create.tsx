// app/tasks/create.tsx
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

export default function CreateTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<
    "low" | "medium" | "high"
  >("medium");

  const handleCreate = () => {
    console.log({ title, description, time, priority });
    router.back();
  };

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

        <Text style={styles.title}>New task</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Enter task title"
          placeholderTextColor={Colors.textMuted}
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Optional description"
          placeholderTextColor={Colors.textMuted}
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
        />

        {/* Time */}
        <Text style={styles.label}>Preferred time</Text>
        <TextInput
          placeholder="e.g. 09:00 - 10:00"
          placeholderTextColor={Colors.textMuted}
          value={time}
          onChangeText={setTime}
          style={styles.input}
        />

        {/* Priority */}
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityRow}>
          {(["low", "medium", "high"] as const).map((p) => {
            const active = priority === p;
            return (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  active && styles.priorityActive,
                ]}
                onPress={() => setPriority(p)}
              >
                <Text
                  style={[
                    styles.priorityText,
                    active && styles.priorityTextActive,
                  ]}
                >
                  {p.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleCreate}
          activeOpacity={0.85}
        >
          <Text style={styles.submitText}>Create task</Text>
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
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 6,
  },

  input: {
    backgroundColor: Colors.gray100,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 16,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: Colors.gray100,
    marginHorizontal: 4,
    alignItems: "center",
  },

  priorityActive: {
    backgroundColor: Colors.primary,
  },

  priorityText: {
    fontWeight: "700",
    fontSize: 13,
    color: Colors.textSecondary,
  },

  priorityTextActive: {
    color: Colors.textPrimary,
  },

  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  submitText: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
});
