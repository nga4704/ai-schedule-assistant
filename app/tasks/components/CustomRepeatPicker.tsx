import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../../constants/colors";

type RepeatUnit = "day" | "week" | "month" | "year";
type EndType = "never" | "onDate" | "afterCount";
type WeekDay = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

const UNIT_LABEL: Record<RepeatUnit, string> = {
  day: "ngày",
  week: "tuần",
  month: "tháng",
  year: "năm",
};

const WEEK_DAYS: { key: WeekDay; label: string }[] = [
  { key: "sun", label: "CN" },
  { key: "mon", label: "T2" },
  { key: "tue", label: "T3" },
  { key: "wed", label: "T4" },
  { key: "thu", label: "T5" },
  { key: "fri", label: "T6" },
  { key: "sat", label: "T7" },
];

interface Props {
  onPickEndDate: () => void;
  endDate?: Date | null;
}

export default function CustomRepeatPicker({
  onPickEndDate,
  endDate,
}: Props) {
  const [interval, setInterval] = useState("1");
  const [unit, setUnit] = useState<RepeatUnit>("week");
  const [showUnitMenu, setShowUnitMenu] = useState(false);

  const [days, setDays] = useState<WeekDay[]>([]);
  const [endType, setEndType] = useState<EndType>("never");
  const [count, setCount] = useState("1");

  function toggleDay(d: WeekDay) {
    setDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }

  return (
    <View style={styles.container}>
      {/* ===== Interval ===== */}
      <Text style={styles.label}>Lặp lại mỗi</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.numberInput}
          keyboardType="number-pad"
          value={interval}
          onChangeText={setInterval}
        />

        <TouchableOpacity
          style={styles.unitButton}
          onPress={() => setShowUnitMenu(!showUnitMenu)}
        >
          <Text>{UNIT_LABEL[unit]} ▾</Text>
        </TouchableOpacity>
      </View>

      {showUnitMenu && (
        <View style={styles.menu}>
          {(Object.keys(UNIT_LABEL) as RepeatUnit[]).map((u) => (
            <TouchableOpacity
              key={u}
              style={styles.menuItem}
              onPress={() => {
                setUnit(u);
                setShowUnitMenu(false);
              }}
            >
              <Text>{UNIT_LABEL[u]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ===== Week days ===== */}
      {unit === "week" && (
        <>
          <Text style={styles.label}>Lặp lại vào</Text>
          <View style={styles.weekRow}>
            {WEEK_DAYS.map((d) => {
              const active = days.includes(d.key);
              return (
                <TouchableOpacity
                  key={d.key}
                  style={[
                    styles.dayChip,
                    active && styles.dayChipActive,
                  ]}
                  onPress={() => toggleDay(d.key)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      active && styles.dayTextActive,
                    ]}
                  >
                    {d.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      {/* ===== End ===== */}
      <Text style={styles.label}>Kết thúc</Text>

      {/* Never */}
      <TouchableOpacity
        style={styles.radioRow}
        onPress={() => setEndType("never")}
      >
        <View
          style={[
            styles.radio,
            endType === "never" && styles.radioActive,
          ]}
        />
        <Text>Không bao giờ</Text>
      </TouchableOpacity>

      {/* On date */}
      <TouchableOpacity
        style={styles.radioRow}
        onPress={() => setEndType("onDate")}
      >
        <View
          style={[
            styles.radio,
            endType === "onDate" && styles.radioActive,
          ]}
        />
        <Text>Vào ngày</Text>
      </TouchableOpacity>

      {endType === "onDate" && (
        <TouchableOpacity
          style={styles.dateBox}
          onPress={onPickEndDate}
        >
          <Text>
            {endDate ? endDate.toLocaleDateString() : "Chọn ngày"}
          </Text>
        </TouchableOpacity>
      )}

      {/* After count */}
      <TouchableOpacity
        style={styles.radioRow}
        onPress={() => setEndType("afterCount")}
      >
        <View
          style={[
            styles.radio,
            endType === "afterCount" && styles.radioActive,
          ]}
        />
        <Text>Sau</Text>
      </TouchableOpacity>

      {endType === "afterCount" && (
        <View style={styles.afterRow}>
          <TextInput
            style={styles.numberInput}
            keyboardType="number-pad"
            value={count}
            onChangeText={setCount}
          />
          <Text>lần xuất hiện</Text>
        </View>
      )}
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 20,
  },
  label: {
    marginBottom: 6,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  numberInput: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 12,
    minWidth: 60,
    textAlign: "center",
  },
  unitButton: {
    backgroundColor: Colors.card,
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 12,
  },
  menu: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
  },
  menuItem: {
    padding: 14,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dayChip: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.gray200,
  },
  dayChipActive: {
    backgroundColor: Colors.primary,
  },
  dayText: {
    fontWeight: "600",
  },
  dayTextActive: {
    color: Colors.textOnPrimary,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.gray400,
  },
  radioActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  dateBox: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 12,
    marginLeft: 28,
    marginTop: 6,
  },
  afterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 28,
    marginTop: 6,
  },
});
