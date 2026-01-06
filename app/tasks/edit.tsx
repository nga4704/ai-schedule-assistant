// tasks/edit.tsx
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../../constants/colors";

import { Timestamp } from "firebase/firestore";

import {
    deleteTask,
    getTaskById,
    updateTask,
} from "../services/taskService";

import ColorPicker from "./components/ColorPicker";
import ReminderPicker from "./components/ReminderPicker";
import RepeatPicker, { RepeatPreset, WeekDay } from "./components/RepeatPicker";
import TimePickerSection from "./components/TimePickerSection";

import { toDateSafe } from "../helpers/date";

type PickerMode = "startDate" | "startTime" | "endTime" | "repeatEnd" | null;

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskColor, setTaskColor] = useState<string | null>(null);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [reminderOffset, setReminderOffset] = useState(30);

  const [repeatPreset, setRepeatPreset] = useState<RepeatPreset>("none");
  const [repeatDays, setRepeatDays] = useState<WeekDay[]>([]);
  const [repeatEndDate, setRepeatEndDate] = useState<Date | null>(null);

  const [pickerMode, setPickerMode] = useState<PickerMode>(null);

  /* ===== LOAD TASK ===== */
  useEffect(() => {
    async function load() {
      const task: any = await getTaskById(id);

      const start = toDateSafe(task.startTime);
      const end = toDateSafe(task.endTime);

      setTitle(task.title);
      setDescription(task.description ?? "");
      setTaskColor(task.taskColor ?? null);

      setStartDate(start);
      setStartTime(start);
      setEndTime(end);

      setReminderOffset(task.reminderOffset ?? 30);

      setRepeatPreset(task.repeat?.preset ?? "none");
      setRepeatDays(task.repeat?.days ?? []);
      setRepeatEndDate(
        task.repeat?.endDate ? toDateSafe(task.repeat.endDate) : null
      );

      setLoading(false);
    }

    load();
  }, [id]);

  async function handleUpdate() {
    await updateTask(id, {
      title,
      description,
      taskColor,
      startDate: Timestamp.fromDate(startDate),
      startTime: Timestamp.fromDate(startTime),
      endTime: Timestamp.fromDate(endTime),
      reminderOffset,
      repeat: {
        preset: repeatPreset,
        days:
          repeatPreset === "weekly" || repeatPreset === "custom"
            ? repeatDays
            : [],
        endDate: repeatEndDate
          ? Timestamp.fromDate(repeatEndDate)
          : null,
      },
    });

    Alert.alert("Đã cập nhật");
    router.back();
  }

  async function handleDelete() {
    Alert.alert("Xoá công việc?", "Hành động này không thể hoàn tác", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          await deleteTask(id);
          router.replace("/calendar");
        },
      },
    ]);
  }

  function getPickerValue() {
    switch (pickerMode) {
      case "startDate":
        return startDate;
      case "startTime":
        return startTime;
      case "endTime":
        return endTime;
      case "repeatEnd":
        return repeatEndDate ?? new Date();
      default:
        return new Date();
    }
  }

  function onPickerChange(_: DateTimePickerEvent, selected?: Date) {
    if (!selected) return setPickerMode(null);

    if (pickerMode === "startDate") setStartDate(selected);
    if (pickerMode === "startTime") setStartTime(selected);
    if (pickerMode === "endTime") setEndTime(selected);
    if (pickerMode === "repeatEnd") setRepeatEndDate(selected);

    setPickerMode(null);
  }

  if (loading) return <Text>Đang tải...</Text>;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Tiêu đề</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} />

        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
        />

        <TimePickerSection
          startDate={startDate}
          startTime={startTime}
          endTime={endTime}
          onPickStartDate={() => setPickerMode("startDate")}
          onPickStartTime={() => setPickerMode("startTime")}
          onPickEndTime={() => setPickerMode("endTime")}
        />

        <ReminderPicker value={reminderOffset} onChange={setReminderOffset} />

        <RepeatPicker
          preset={repeatPreset}
          days={repeatDays}
          onChangePreset={setRepeatPreset}
          onChangeDays={setRepeatDays}
          repeatEndDate={repeatEndDate}
          onPickRepeatEndDate={() => setPickerMode("repeatEnd")}
        />

        <ColorPicker value={taskColor} onChange={setTaskColor} />
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.delete} onPress={handleDelete}>
          <Text style={{ fontWeight: "800" }}>Xoá</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.save} onPress={handleUpdate}>
          <Text style={{ fontWeight: "800" }}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {pickerMode && (
        <DateTimePicker
          value={getPickerValue()}
          mode={
            pickerMode === "startTime" || pickerMode === "endTime"
              ? "time"
              : "date"
          }
          minuteInterval={15}
          onChange={onPickerChange}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 120 },
  label: { marginTop: 16, fontWeight: "700" },
  input: { backgroundColor: Colors.card, padding: 14, borderRadius: 12 },
  textArea: { height: 100 },

  actions: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  delete: {
    flex: 1,
    backgroundColor: "#ffcccc",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  save: {
    flex: 2,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
});
