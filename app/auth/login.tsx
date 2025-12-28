import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { loginUser } from "../../firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      router.replace("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Login to continue
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("./register")}>
            <Text style={styles.link}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: Colors.card,
    borderRadius: 28,
    padding: 28,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: Colors.textPrimary,
  },

  subtitle: {
    textAlign: "center",
    color: Colors.textMuted,
    marginBottom: 32,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 24,
    color: Colors.textPrimary,
  },

  button: {
    marginTop: 20,
    backgroundColor: Colors.buttonBackground,
    paddingVertical: 14,
    borderRadius: 30,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.buttonText,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  footerText: {
    color: Colors.textSecondary,
  },

  link: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
});
