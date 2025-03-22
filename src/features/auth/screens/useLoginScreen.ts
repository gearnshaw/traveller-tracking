import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store";
import { LoginCredentials } from "../types";

export const useLoginScreen = () => {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;
    await login({ email, password });
  };

  const handleSignUpPress = () => {
    router.push("/(auth)/signup");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
    handleSignUpPress,
  };
};
