import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";

interface Props {
  startDate: Date;
  startTime: Date;
  endTime: Date;
  onPickStartDate: () => void;
  onPickStartTime: () => void;
  onPickEndTime: () => void;
}

export default function TimePickerSection({
  startDate,
  startTime,
  endTime,
  onPickStartDate,
  onPickStartTime,
  onPickEndTime,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>Thời gian thực hiện</Text>

      <View style={styles.timeRow}>
        <TouchableOpacity style={styles.timeBox} onPress={onPickStartDate}>
          <Feather name="calendar" size={16} />
          <Text style={styles.timeText}>
            {startDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.timeBox} onPress={onPickStartTime}>
          <Feather name="clock" size={16} />
          <Text style={styles.timeText}>
            {startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>

        <Text>–</Text>

        <TouchableOpacity style={styles.timeBox} onPress={onPickEndTime}>
          <Feather name="clock" size={16} />
          <Text style={styles.timeText}>
            {endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { marginTop: 16, marginBottom: 6, fontWeight: "700" },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeBox: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  timeText: { fontWeight: "500" },
});
