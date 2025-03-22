import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/features/auth/store";
import { authApi } from "@/features/auth/api";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { tw } from "../src/shared/utils/tw";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = authApi.onAuthStateChange((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const { user } = useAuthStore.getState();

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth screens
      router.replace("/");
    }
  }, [segments]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tw.color("primary-600"),
        tabBarInactiveTintColor: tw.color("gray-400"),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="followers"
        options={{
          title: "Followers",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
