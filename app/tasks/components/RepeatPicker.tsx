// tasks/components/RepeatPicker.tsx
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors";
import CustomRepeatPicker from "./CustomRepeatPicker";

export type RepeatPreset =
  | "none"
  | "daily"
  | "weekly"
  | "monthly-first-weekday"
  | "yearly"
  | "weekday"
  | "custom";

const repeatLabel: Record<RepeatPreset, string> = {
  none: "Không lặp lại",
  daily: "Hàng ngày",
  weekly: "Hàng tuần",
  "monthly-first-weekday": "Hàng tháng (thứ đầu tiên)",
  yearly: "Hàng năm",
  weekday: "Thứ 2 → Thứ 6",
  custom: "Tùy chỉnh",
};

interface Props {
  preset: RepeatPreset;
  onChangePreset: (p: RepeatPreset) => void;

  /** cho CustomRepeatPicker */
  repeatEndDate?: Date | null;
  onPickRepeatEndDate?: () => void;
}

export default function RepeatPicker({
  preset,
  onChangePreset,
  repeatEndDate,
  onPickRepeatEndDate,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Text style={styles.label}>Lặp lại</Text>

      {/* ===== PRESET PICKER ===== */}
      <TouchableOpacity
        style={styles.boxRow}
        onPress={() => setOpen(!open)}
      >
        <Feather name="repeat" size={16} />
        <Text style={styles.boxText}>
          {repeatLabel[preset]} ▾
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.menu}>
          {(Object.keys(repeatLabel) as RepeatPreset[]).map((k) => (
            <TouchableOpacity
              key={k}
              style={styles.menuItem}
              onPress={() => {
                onChangePreset(k);
                setOpen(false);
              }}
            >
              <Text>{repeatLabel[k]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ===== CUSTOM REPEAT ===== */}
      {preset === "custom" && (
        <CustomRepeatPicker
          endDate={repeatEndDate}
          onPickEndDate={onPickRepeatEndDate ?? (() => {})}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "700",
  },
  boxRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 12,
  },
  boxText: { marginLeft: 8 },
  menu: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
  },
  menuItem: { padding: 14 },
});
