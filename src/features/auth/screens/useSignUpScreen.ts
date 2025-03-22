import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store";
import { SignUpCredentials } from "../types";

export const useSignUpScreen = () => {
  const router = useRouter();
  const { signUp, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !displayName) return;
    await signUp({ email, password, displayName });
  };

  const handleLoginPress = () => {
    router.push("/(auth)/login");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    isLoading,
    error,
    handleSignUp,
    handleLoginPress,
  };
};
