import {
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Typography } from '@/shared/components/base/Typography';
import tw from 'twrnc';
import { Button } from '@/shared/components/base/Button';
import { useLoginScreen } from './useLoginScreen';
import { useEffect } from 'react';

export const LoginScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    alert,
    handleLogin,
    handleForgotPassword,
    dismissAlert
  } = useLoginScreen();

  useEffect(() => {
    if (alert.visible) {
      Alert.alert(alert.title, alert.message, [{ text: 'OK', onPress: dismissAlert }]);
    }
  }, [alert, dismissAlert]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
      testID="login-screen"
      accessibilityLabel="Login screen"
    >
      <ScrollView
        style={tw`flex-1 bg-white`}
        contentContainerStyle={tw`min-h-full justify-center px-4`}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        testID="login-scroll-view"
      >
        <View style={tw`flex-1 justify-center`}>
          {/* Title */}
          <Typography
            variant="pageTitle"
            style={tw`text-center mb-12`}
            testID="login-title"
            accessibilityRole="header"
          >
            Welcome Back
          </Typography>

          {/* Email Input */}
          <View style={tw`w-full mb-4`}>
            <Typography
              variant="body"
              style={tw`mb-2 text-gray-700 font-medium`}
              testID="email-label"
              accessibilityRole="text"
            >
              Email
            </Typography>
            <TextInput
              style={tw`w-full h-12 px-4 border border-gray-200 rounded-lg bg-gray-50`}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              testID="email-input"
              accessibilityLabel="Email input"
              accessibilityHint="Enter your email address"
            />
          </View>

          {/* Password Input */}
          <View style={tw`w-full mb-2`}>
            <Typography
              variant="body"
              style={tw`mb-2 text-gray-700 font-medium`}
              testID="password-label"
              accessibilityRole="text"
            >
              Password
            </Typography>
            <TextInput
              style={tw`w-full h-12 px-4 border border-gray-200 rounded-lg bg-gray-50`}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              testID="password-input"
              accessibilityLabel="Password input"
              accessibilityHint="Enter your password"
            />
          </View>

          {/* Forgot Password */}
          <Pressable
            style={tw`self-end mb-8`}
            onPress={handleForgotPassword}
            testID="forgot-password-button"
            accessibilityRole="button"
            accessibilityLabel="Forgot password"
            accessibilityHint="Tap to reset your password"
          >
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
            testID="login-button"
            accessibilityRole="button"
            accessibilityLabel="Log in"
            accessibilityState={{ disabled: loading }}
          >
            {loading ? 'Signing in...' : 'Log In'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
