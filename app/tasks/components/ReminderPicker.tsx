// tasks/components/ReminderPicker.tsx
import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";

interface Props {
  value: number; // minutes
  onChange: (minutes: number) => void;
}

type Unit = "minute" | "hour" | "day" | "week";

const UNIT_LABEL: Record<Unit, string> = {
  minute: "phút",
  hour: "giờ",
  day: "ngày",
  week: "tuần",
};

const UNIT_TO_MINUTES: Record<Unit, number> = {
  minute: 1,
  hour: 60,
  day: 1440,
  week: 10080,
};

export default function ReminderPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const initial = useMemo(() => {
    if (value % UNIT_TO_MINUTES.week === 0)
      return { unit: "week" as Unit, num: value / UNIT_TO_MINUTES.week };
    if (value % UNIT_TO_MINUTES.day === 0)
      return { unit: "day" as Unit, num: value / UNIT_TO_MINUTES.day };
    if (value % UNIT_TO_MINUTES.hour === 0)
      return { unit: "hour" as Unit, num: value / UNIT_TO_MINUTES.hour };
    return { unit: "minute" as Unit, num: value };
  }, [value]);

  const [unit, setUnit] = useState<Unit>(initial.unit);
  const [num, setNum] = useState(String(initial.num));

  function update(n: string, u = unit) {
    const parsed = parseInt(n, 10);
    if (isNaN(parsed) || parsed <= 0) return;
    onChange(parsed * UNIT_TO_MINUTES[u]);
  }

  return (
    <View>
      <Text style={styles.label}>Thông báo</Text>

      {/* Input Card */}
      <View style={styles.card}>
        <Feather name="bell" size={18} color={Colors.textPrimary} />

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={num}
          placeholder="30"
          placeholderTextColor={Colors.gray400}
          onChangeText={(t) => {
            setNum(t);
            update(t);
          }}
        />

        <TouchableOpacity
          style={styles.unitButton}
          onPress={() => setOpen(!open)}
          activeOpacity={0.7}
        >
          <Text style={styles.unitText}>{UNIT_LABEL[unit]}</Text>
          <Feather name="chevron-down" size={14} />
        </TouchableOpacity>
      </View>

      {/* Unit dropdown */}
      {open && (
        <View style={styles.menu}>
          {(Object.keys(UNIT_LABEL) as Unit[]).map((u) => (
            <TouchableOpacity
              key={u}
              style={[
                styles.menuItem,
                u === unit && styles.menuItemActive,
              ]}
              onPress={() => {
                setUnit(u);
                update(num, u);
                setOpen(false);
              }}
            >
              <Text
                style={[
                  styles.menuText,
                  u === unit && styles.menuTextActive,
                ]}
              >
                {UNIT_LABEL[u]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  /* ===== Main Input Card ===== */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.gray200,
    gap: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: Colors.textPrimary,
  },

  unitButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: Colors.gray100,
  },

  unitText: {
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  /* ===== Dropdown ===== */
  menu: {
    marginTop: 6,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.gray200,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  menuItemActive: {
    backgroundColor: Colors.primaryLight,
  },

  menuText: {
    fontSize: 15,
  },

  menuTextActive: {
    fontWeight: "700",
  },
});
