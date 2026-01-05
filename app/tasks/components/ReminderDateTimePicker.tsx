import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors";

interface Props {
  value: Date | null;
  onPickDate: () => void;
  onPickTime: () => void;
}

function formatDate(date: Date) {
  return date.toLocaleDateString();
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ReminderDateTimePicker({
  value,
  onPickDate,
  onPickTime,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>Nhắc nhở</Text>

      <View style={styles.row}>
        {/* ===== DATE ===== */}
        <TouchableOpacity
          style={styles.box}
          onPress={onPickDate}
          activeOpacity={0.7}
        >
          <Feather name="calendar" size={16} color={Colors.textPrimary} />
          <Text
            style={[
              styles.boxText,
              !value && styles.placeholder,
            ]}
          >
            {value ? formatDate(value) : "Chọn ngày"}
          </Text>
        </TouchableOpacity>

        {/* ===== TIME ===== */}
        <TouchableOpacity
          style={styles.box}
          onPress={onPickTime}
          activeOpacity={0.7}
        >
          <Feather name="clock" size={16} color={Colors.textPrimary} />
          <Text
            style={[
              styles.boxText,
              !value && styles.placeholder,
            ]}
          >
            {value ? formatTime(value) : "Chọn giờ"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  box: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.gray200,
    gap: 8,
  },

  boxText: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
  },

  placeholder: {
    color: Colors.gray400,
  },
});
