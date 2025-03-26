import { useState } from 'react';
import { Alert } from 'react-native';
import { auth } from '@/services/firebase';

export const useLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'This feature is not yet implemented. Please contact support if you need to reset your password.',
      [{ text: 'OK' }]
    );
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Sign in failed', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!');
    } catch (error: any) {
      let message = 'An error occurred while signing in';

      if (error.code === 'auth/invalid-email') {
        message = 'That email address is invalid';
      } else if (error.code === 'auth/user-disabled') {
        message = 'This user account has been disabled';
      } else if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email address';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Invalid password';
      }

      Alert.alert('Sign in failed', message);
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
    handleForgotPassword
  };
};
