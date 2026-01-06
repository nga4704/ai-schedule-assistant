// app/tasks/create.tsx
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/colors";

/* firebase */
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

/* services & components */
import { addTask } from "../services/taskService";
import ColorPicker from "./components/ColorPicker";
import ReminderPicker from "./components/ReminderPicker";
import RepeatPicker, { RepeatPreset } from "./components/RepeatPicker";
import TimePickerSection from "./components/TimePickerSection";

type WeekDay = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
type PickerMode = "startDate" | "startTime" | "endTime" | "repeatEnd" | null;

function roundTo15Minutes(date: Date) {
  const d = new Date(date);
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
  return d;
}

export default function CreateTaskScreen() {
  const now = new Date();

  /** ===== BASIC ===== */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /** ===== COLOR ===== */
  const [taskColor, setTaskColor] = useState<string | null>(null);


  /** ===== TIME ===== */
  const [startDate, setStartDate] = useState(now);
  const [startTime, setStartTime] = useState(roundTo15Minutes(now));
  const [endTime, setEndTime] = useState(
    new Date(roundTo15Minutes(now).getTime() + 30 * 60 * 1000)
  );

  /** ===== REMINDER (offset only) ===== */
  const [reminderOffset, setReminderOffset] = useState(30);

  /** ===== REPEAT ===== */
  const [repeatPreset, setRepeatPreset] = useState<RepeatPreset>("none");
  const [repeatDays] = useState<WeekDay[]>([]);
  const [repeatEndDate, setRepeatEndDate] = useState<Date | null>(null);

  /** ===== PICKER ===== */
  const [pickerMode, setPickerMode] = useState<PickerMode>(null);

  /** ================= HANDLERS ================= */
  async function handleCreate() {
    if (!title.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tiêu đề");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Lỗi", "Bạn chưa đăng nhập");
      return;
    }

    const task = {
      title,
      description,
      taskColor,

      startDate: Timestamp.fromDate(startDate),
      startTime: Timestamp.fromDate(startTime),
      endTime: Timestamp.fromDate(endTime),

      repeat: {
        preset: repeatPreset,
        days: repeatDays,
        endDate: repeatEndDate
          ? Timestamp.fromDate(repeatEndDate)
          : null,
      },

      reminderOffset,

      completed: false, // ✅ NEW
    };

    try {
      await addTask(user.uid, task);
      Alert.alert("Thành công", "Đã tạo công việc");
      router.back();
    } catch {
      Alert.alert("Lỗi", "Không thể lưu công việc. Thử lại sau.");
    }
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

  function onPickerChange(event: DateTimePickerEvent, selected?: Date) {
    if (Platform.OS === "android" && event.type === "dismissed") {
      setPickerMode(null);
      return;
    }
    if (!selected) {
      setPickerMode(null);
      return;
    }

    switch (pickerMode) {

      case "startTime": {
        const newStart = selected;
        setStartTime(newStart);

        // 🔥 đảm bảo endTime luôn sau startTime ít nhất 30 phút
        if (endTime <= newStart) {
          setEndTime(new Date(newStart.getTime() + 30 * 60 * 1000));
        }
        break;
      }

      case "endTime": {
        const newEnd = selected;

        // 🔥 nếu endTime < startTime → tự chỉnh lại
        if (newEnd <= startTime) {
          setEndTime(new Date(startTime.getTime() + 30 * 60 * 1000));
        } else {
          setEndTime(newEnd);
        }
        break;
      }

      case "startDate":
        setStartDate(selected);
        break;

      case "repeatEnd":
        setRepeatEndDate(selected);
        break;
    }

    setPickerMode(null);
  }


  /** ================= UI ================= */
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancel}>Huỷ</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo công việc</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Tiêu đề</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tiêu đề công việc"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Nhập mô tả (không bắt buộc)"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* TIME */}
        <TimePickerSection
          startDate={startDate}
          startTime={startTime}
          endTime={endTime}
          onPickStartDate={() => setPickerMode("startDate")}
          onPickStartTime={() => setPickerMode("startTime")}
          onPickEndTime={() => setPickerMode("endTime")}
        />

        {/* REMINDER (OFFSET ONLY) */}
        <ReminderPicker
          value={reminderOffset}
          onChange={(v) => setReminderOffset(v)}
        />

        {/* REPEAT */}
        <RepeatPicker
          preset={repeatPreset}
          onChangePreset={setRepeatPreset}
          repeatEndDate={repeatEndDate}
          onPickRepeatEndDate={() => setPickerMode("repeatEnd")}
        />

        {/* COLOR */}
        <ColorPicker value={taskColor} onChange={setTaskColor} />
      </ScrollView>

      <TouchableOpacity style={styles.submit} onPress={handleCreate}>
        <Text style={styles.submitText}>Tạo công việc</Text>
      </TouchableOpacity>

      {pickerMode && (
        <DateTimePicker
          value={getPickerValue()}
          minuteInterval={15}
          mode={
            pickerMode === "startTime" || pickerMode === "endTime"
              ? "time"
              : "date"
          }
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onPickerChange}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.card,
  },
  cancel: { fontWeight: "600" },
  headerTitle: { fontSize: 18, fontWeight: "800" },

  container: { padding: 20, paddingBottom: 120 },
  label: { marginTop: 16, marginBottom: 6, fontWeight: "700" },
  input: {
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 12,
  },
  textArea: { height: 100, textAlignVertical: "top" },

  submit: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  submitText: { fontWeight: "800", fontSize: 16 },
});
