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

export default function DueDateTimePicker({
  value,
  onPickDate,
  onPickTime,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>Ngày & giờ đến hạn</Text>

      <View style={styles.row}>
        {/* ===== DATE ===== */}
        <TouchableOpacity style={styles.box} onPress={onPickDate}>
          <Feather name="calendar" size={16} />
          <Text style={styles.boxText}>
            {value ? formatDate(value) : "Chọn ngày"}
          </Text>
        </TouchableOpacity>

        {/* ===== TIME ===== */}
        <TouchableOpacity style={styles.box} onPress={onPickTime}>
          <Feather name="clock" size={16} />
          <Text style={styles.boxText}>
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
    padding: 14,
    borderRadius: 12,
  },
  boxText: {
    marginLeft: 8,
  },
});
