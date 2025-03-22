import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { useSignUpScreen } from "./useSignUpScreen";

export const SignUpScreen = () => {
  const {
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
  } = useSignUpScreen();

  return (
    <View style={tw`flex-1 justify-center p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-6 text-center`}>
        Create Account
      </Text>

      <View style={tw`space-y-4`}>
        <View>
          <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>
            Display Name
          </Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3`}
            placeholder="Enter your name"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
          />
        </View>

        <View>
          <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Email</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3`}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View>
          <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>
            Password
          </Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3`}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error && (
          <Text style={tw`text-red-500 text-sm text-center`}>{error}</Text>
        )}

        <TouchableOpacity
          style={tw`bg-blue-500 rounded-lg p-4 mt-4`}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={tw`text-white text-center font-medium`}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLoginPress} style={tw`mt-4`}>
          <Text style={tw`text-blue-500 text-center`}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
