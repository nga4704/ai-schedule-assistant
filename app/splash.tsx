import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Colors } from "./constants/colors";
import { auth } from "./firebase/firebaseConfig";
import { AuthProvider } from "./hooks/useAuth";

export default function SplashScreen() {
  useEffect(() => {
    const initApp = async () => {
      try {
        await fakeDelay(800);

        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            router.replace("/auth/login");
            return;
          }

          await AuthProvider(user.uid);
          router.replace("/");
        });
      } catch (err) {
        console.log("Init error:", err);
        router.replace("/auth/login");
      }
    };

    initApp();
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔹 Logo image */}
      <Image
        source={require("../assets/splash.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const fakeDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
    borderRadius: 999,
    backgroundColor: Colors.background,
  },
  text: {
    marginTop: 12,
    color: "#666",
  },
});
