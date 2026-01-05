import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors";

interface Props {
  value: string | null;
  onChange: (c: string | null) => void;
}

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[
          styles.circle,
          styles.noColor,
          value === null && styles.active,
        ]}
        onPress={() => onChange(null)}
      >
        {value === null && <Feather name="slash" size={16} color="#999" />}
      </TouchableOpacity>

      {Colors.taskPastel.map((c) => {
        const active = c === value;
        return (
          <TouchableOpacity
            key={c}
            style={[
              styles.circle,
              { backgroundColor: c },
              active && styles.active,
            ]}
            onPress={() => onChange(c)}
          >
            {active && <Feather name="check" size={16} color="#fff" />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12, marginTop: 26 },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    borderWidth: 3,
    borderColor: "#fff",
  },
  noColor: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.gray400,
  },
});
