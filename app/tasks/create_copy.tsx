import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { Colors } from "../../constants/colors";

/* components */
import { getAuth } from "firebase/auth";
import { addTask, TaskData } from "../services/taskService";
import ColorPicker from "./components/ColorPicker";
import DueDateTimePicker from "./components/DueDateTimePicker";
import ReminderDateTimePicker from "./components/ReminderDateTimePicker";
import ReminderPicker from "./components/ReminderPicker";
import RepeatPicker, { RepeatPreset } from "./components/RepeatPicker";
import TimePickerSection from "./components/TimePickerSection";

type WeekDay = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
type PickerMode =
  | "startDate"
  | "startTime"
  | "endTime"
  | "dueDate"
  | "dueTime"
  | "reminderDate"
  | "reminderTime"
  | "repeatEnd"
  | null;

function roundTo15Minutes(date: Date) {
  const d = new Date(date);
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
  return d;
}

export default function CreateTaskScreen() {
  const now = new Date();

  /* ===== BASIC ===== */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* ===== COLOR ===== */
  const [taskColor, setTaskColor] = useState<string | null>(null);

  /* ===== TIME ===== */
  const [startDate, setStartDate] = useState(now);
  const [startTime, setStartTime] = useState(roundTo15Minutes(now));
  const [endTime, setEndTime] = useState(
    new Date(roundTo15Minutes(now).getTime() + 30 * 60 * 1000)
  );

  /* ===== DUE ===== */
  const [dueDateTime, setDueDateTime] = useState<Date | null>(null);

  /* ===== REMINDER ===== */
  const [reminderOffset, setReminderOffset] = useState(30);
  const [reminderDateTime, setReminderDateTime] = useState<Date | null>(null);

  /* ===== REPEAT ===== */
  const [repeatPreset, setRepeatPreset] = useState<RepeatPreset>("none");
  const [repeatDays] = useState<WeekDay[]>([]);
  const [repeatEndDate, setRepeatEndDate] = useState<Date | null>(null);

  /* ===== PICKER ===== */
  const [pickerMode, setPickerMode] = useState<PickerMode>(null);

  /* ================= EFFECT ================= */
  useEffect(() => {
    // Nếu reminder chưa được chọn, set giờ reminder dựa trên offset nhưng không đổi ngày
    if (!reminderDateTime && dueDateTime) {
      const reminder = new Date(dueDateTime);
      reminder.setMinutes(reminder.getMinutes() - reminderOffset);
      setReminderDateTime(reminder);
    }
  }, [dueDateTime, reminderOffset]);

  /* ================= HANDLERS ================= */
  // Trong handleCreate
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

    const task: TaskData = {
      title,
      description,
      taskColor,
      startDate: startDate.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      // dueDateTime: dueDateTime ? dueDateTime.toISOString() : null,
      // reminderDateTime: reminderDateTime ? reminderDateTime.toISOString() : null,
      repeat: {
        preset: repeatPreset,
        days: repeatDays,
        endDate: repeatEndDate ? repeatEndDate.toISOString() : null,
      },
      // reminderOffset,
    };

    try {
      const id = await addTask(user.uid, task);
      console.log("Task saved with ID:", id);

      Alert.alert("Thành công", "Đã tạo công việc");
      router.back();
    } catch (error) {
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
      case "dueDate":
      case "dueTime":
        return dueDateTime ?? new Date();
      case "reminderDate":
      case "reminderTime":
        return reminderDateTime ?? new Date();
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
      case "startDate":
        setStartDate(selected);
        break;
      case "startTime":
        setStartTime(selected);
        break;
      case "endTime":
        setEndTime(selected);
        break;
      case "dueDate":
        if (dueDateTime) {
          const d = new Date(dueDateTime);
          d.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
          setDueDateTime(d);
        } else {
          setDueDateTime(selected);
        }
        break;
      case "dueTime":
        if (dueDateTime) {
          const d = new Date(dueDateTime);
          d.setHours(selected.getHours(), selected.getMinutes());
          setDueDateTime(d);
        } else {
          setDueDateTime(selected);
        }
        break;

      case "reminderDate":
        if (reminderDateTime) {
          const d = new Date(reminderDateTime);
          d.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
          setReminderDateTime(d);
        } else {
          setReminderDateTime(selected);
        }
        break;

      case "reminderTime":
        if (reminderDateTime) {
          const d = new Date(reminderDateTime);
          d.setHours(selected.getHours(), selected.getMinutes());
          setReminderDateTime(d);
        } else {
          setReminderDateTime(selected);
        }
        break;

      case "repeatEnd":
        setRepeatEndDate(selected);
        break;
    }

    setPickerMode(null);
  }

  /* ================= UI ================= */
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

        {/* DUE */}
        <DueDateTimePicker
          value={dueDateTime}
          onPickDate={() => setPickerMode("dueDate")}
          onPickTime={() => setPickerMode("dueTime")}
        />

        {/* REMINDER OFFSET */}
        <ReminderPicker
          value={reminderOffset}
          onChange={(v) => {
            setReminderOffset(v);
          }}
        />

        {/* REMINDER DATETIME */}
        <ReminderDateTimePicker
          value={reminderDateTime}
          onPickDate={() => setPickerMode("reminderDate")}
          onPickTime={() => setPickerMode("reminderTime")}
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

      {/* GLOBAL PICKER */}
      {pickerMode && (
        <DateTimePicker
          value={getPickerValue()}
          minuteInterval={15}
          mode={
            pickerMode === "startTime" ||
              pickerMode === "endTime" ||
              pickerMode === "dueTime" ||
              pickerMode === "reminderTime"
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

  container: {
    padding: 20,
    paddingBottom: 120,
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "700",
  },
  input: {
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
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
  submitText: {
    fontWeight: "800",
    fontSize: 16,
  },
});
