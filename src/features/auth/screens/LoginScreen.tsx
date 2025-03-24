import { View, TextInput, Pressable } from "react-native";
import { Typography } from "@/shared/components/base/Typography";
import tw from "twrnc";
import { Button } from "@/shared/components/base/Button";
import { useLoginScreen } from "./useLoginScreen";

export const LoginScreen = () => {
  const { email, setEmail, password, setPassword, loading, handleLogin } =
    useLoginScreen();

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-1 justify-center`}>
        {/* Title */}
        <Typography variant="pageTitle" style={tw`text-center mb-12`}>
          Welcome Back
        </Typography>

        {/* Email Input */}
        <View style={tw`w-full mb-4`}>
          <Typography variant="body" style={tw`mb-2 text-gray-700 font-medium`}>
            Email
          </Typography>
          <TextInput
            style={tw`w-full h-12 px-4 border border-gray-200 rounded-lg bg-gray-50`}
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={tw`w-full mb-2`}>
          <Typography variant="body" style={tw`mb-2 text-gray-700 font-medium`}>
            Password
          </Typography>
          <TextInput
            style={tw`w-full h-12 px-4 border border-gray-200 rounded-lg bg-gray-50`}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Forgot Password */}
        <Pressable style={tw`self-end mb-8`}>
          <Typography variant="body" style={tw`text-blue-500`}>
            Forgot Password?
          </Typography>
        </Pressable>

        {/* Login Button */}
        <Button
          variant="primary"
          style={tw`w-full py-4`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Log In"}
        </Button>
      </View>
    </View>
  );
};
