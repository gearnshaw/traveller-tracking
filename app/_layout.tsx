import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { auth } from '@/services/firebase';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    },
    [initializing]
  );

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (user && !inAuthGroup) {
      router.replace('/(auth)/home');
    } else if (!user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, initializing, router, segments]);

  if (initializing)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
