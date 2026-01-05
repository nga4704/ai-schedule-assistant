// app/(tabs)/profile.tsx
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";
import { logoutUser } from "../../../firebase/auth";
import { useAuth } from "../../../hooks/useAuth";
import { useUserProfile } from "../../../hooks/useUserProfile";

export default function ProfileScreen() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarLarge} />
        <Text style={styles.name}>
          {user?.email?.split("@")[0] ??
            "Người dùng"}
        </Text>
        <Text style={styles.email}>
          {user?.email}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatBox number="24" label="Công việc" />
        <StatBox number="12" label="Ngày" />
        <StatBox number="5" label="Chuỗi" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Tài khoản
        </Text>
        <ProfileItem
          icon="user"
          label="Chỉnh sửa hồ sơ"
        />
        <ProfileItem
          icon="bell"
          label="Thông báo"
        />
        <ProfileItem
          icon="lock"
          label="Quyền riêng tư & bảo mật"
        />
      </View>

      {profile?.aiConfig && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Trợ lý AI
          </Text>
          <Text style={styles.aiText}>
            Chiến lược:{" "}
            {profile.aiConfig.schedulingStrategy}
          </Text>
          <Text style={styles.aiText}>
            Tự động sắp xếp lại:{" "}
            {profile.aiConfig.autoReschedule
              ? "Bật"
              : "Tắt"}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logoutUser}
      >
        <Text style={styles.logoutText}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ProfileItem({ icon, label }: any) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemLeft}>
        <Feather
          name={icon}
          size={18}
          color={Colors.textPrimary}
        />
        <Text style={styles.itemText}>
          {label}
        </Text>
      </View>
      <Feather
        name="chevron-right"
        size={18}
        color={Colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

function StatBox({ number, label }: any) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statNumber}>
        {number}
      </Text>
      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  avatarLarge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.gray200,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  email: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textSecondary,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  statBox: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 4,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: Colors.textPrimary,
  },

  aiText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 6,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  logoutButton: {
    backgroundColor: Colors.gray200,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 40,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
});
