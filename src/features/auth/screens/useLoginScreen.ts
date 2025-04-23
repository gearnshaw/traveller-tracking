import { useState } from 'react';
import { auth } from '@/services/firebase';
import { authLogger } from '../logger';

type AlertState = {
  title: string;
  message: string;
  visible: boolean;
};

export const useLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    title: '',
    message: '',
    visible: false
  });

  const handleForgotPassword = () => {
    setAlert({
      title: 'Forgot Password',
      message:
        'This feature is not yet implemented. Please contact support if you need to reset your password.',
      visible: true
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setAlert({
        title: 'Sign in failed',
        message: 'Please enter both email and password',
        visible: true
      });
      return;
    }

    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      authLogger.debug('User signed in successfully!');
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

      setAlert({
        title: 'Sign in failed',
        message,
        visible: true
      });
      authLogger.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissAlert = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    alert,
    handleLogin,
    handleForgotPassword,
    dismissAlert
  };
};
