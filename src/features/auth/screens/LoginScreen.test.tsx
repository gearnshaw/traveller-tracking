import { render, screen, fireEvent } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { LoginScreen } from './LoginScreen';

const mockSetEmail = jest.fn();
const mockSetPassword = jest.fn();
const mockHandleLogin = jest.fn();
const mockHandleForgotPassword = jest.fn();

// Mock the hook with a default implementation
jest.mock('./useLoginScreen', () => ({
  useLoginScreen: () => ({
    email: '',
    setEmail: mockSetEmail,
    password: '',
    setPassword: mockSetPassword,
    loading: false,
    handleLogin: mockHandleLogin,
    handleForgotPassword: mockHandleForgotPassword
  })
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  it('should render all main elements', () => {
    render(<LoginScreen />);

    // Check for main container
    expect(screen.getByTestId('login-screen')).toBeTruthy();

    // Check for main content elements
    expect(screen.getByTestId('login-title')).toHaveTextContent('Welcome Back');
    expect(screen.getByTestId('email-label')).toHaveTextContent('Email');
    expect(screen.getByTestId('password-label')).toHaveTextContent('Password');

    // Check for interactive elements
    expect(screen.getByTestId('email-input')).toBeTruthy();
    expect(screen.getByTestId('password-input')).toBeTruthy();
    expect(screen.getByTestId('forgot-password-button')).toBeTruthy();
    expect(screen.getByTestId('login-button')).toBeTruthy();
  });

  // Input Field Tests
  describe('Input Fields', () => {
    it('should update email when typing', () => {
      // Arrange
      const expectedEmail = 'test@example.com';

      // Act
      render(<LoginScreen />);
      const emailInput = screen.getByTestId('email-input');
      fireEvent.changeText(emailInput, expectedEmail);

      // Assert
      expect(mockSetEmail).toHaveBeenCalledWith(expectedEmail);
    });

    it('should update password when typing', () => {
      // Arrange
      const expectedPassword = 'password123';

      // Act
      render(<LoginScreen />);
      const passwordInput = screen.getByTestId('password-input');
      fireEvent.changeText(passwordInput, expectedPassword);

      // Assert
      expect(mockSetPassword).toHaveBeenCalledWith(expectedPassword);
    });
  });

  // Button State Tests
  describe('Button States', () => {
    it('should disable login button when loading', () => {
      // Arrange
      jest.spyOn(require('./useLoginScreen'), 'useLoginScreen').mockImplementation(() => ({
        email: '',
        setEmail: mockSetEmail,
        password: '',
        setPassword: mockSetPassword,
        loading: true,
        handleLogin: mockHandleLogin,
        handleForgotPassword: mockHandleForgotPassword
      }));

      // Act
      render(<LoginScreen />);

      // Assert
      expect(screen.getByTestId('login-button')).toBeDisabled();
    });

    it('should show loading text on button when loading', () => {
      // Arrange
      jest.spyOn(require('./useLoginScreen'), 'useLoginScreen').mockImplementation(() => ({
        email: '',
        setEmail: mockSetEmail,
        password: '',
        setPassword: mockSetPassword,
        loading: true,
        handleLogin: mockHandleLogin,
        handleForgotPassword: mockHandleForgotPassword
      }));

      // Act
      render(<LoginScreen />);

      // Assert
      expect(screen.getByTestId('login-button')).toHaveTextContent('Signing in...');
    });

    it('should enable login button when form is valid', () => {
      // Arrange
      jest.spyOn(require('./useLoginScreen'), 'useLoginScreen').mockImplementation(() => ({
        email: 'test@example.com',
        setEmail: mockSetEmail,
        password: 'password123',
        setPassword: mockSetPassword,
        loading: false,
        handleLogin: mockHandleLogin,
        handleForgotPassword: mockHandleForgotPassword
      }));

      // Act
      render(<LoginScreen />);

      // Assert
      expect(screen.getByTestId('login-button')).toBeEnabled();
    });
  });

  // Form Submission Tests
  describe('Form Submission', () => {
    it('should call handleLogin when form is submitted', () => {
      // Arrange
      render(<LoginScreen />);

      // Act
      const loginButton = screen.getByTestId('login-button');
      fireEvent.press(loginButton);

      // Assert
      expect(mockHandleLogin).toHaveBeenCalled();
    });

    // it('should show error message on failed login', () => {});
    // it('should clear form after successful login', () => {});
    it('should prevent multiple submissions while loading', () => {
      // Arrange
      jest.spyOn(require('./useLoginScreen'), 'useLoginScreen').mockImplementation(() => ({
        email: 'test@example.com',
        setEmail: mockSetEmail,
        password: 'password123',
        setPassword: mockSetPassword,
        loading: true,
        handleLogin: mockHandleLogin,
        handleForgotPassword: mockHandleForgotPassword
      }));

      render(<LoginScreen />);
      const loginButton = screen.getByTestId('login-button');

      // Act
      fireEvent.press(loginButton);
      fireEvent.press(loginButton);

      // Assert
      expect(mockHandleLogin).toHaveBeenCalledTimes(0);
    });
  });

  // Forgot Password Tests
  describe('Forgot Password', () => {
    it('should call handleForgotPassword when forgot password is clicked', () => {
      // Arrange
      render(<LoginScreen />);

      // Act
      const forgotPasswordButton = screen.getByTestId('forgot-password-button');
      fireEvent.press(forgotPasswordButton);

      // Assert
      expect(mockHandleForgotPassword).toHaveBeenCalled();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    const accessibilityTestCases = [
      {
        testId: 'login-screen',
        expectedLabel: 'Login screen'
      },
      {
        testId: 'email-input',
        expectedLabel: 'Email input'
      },
      {
        testId: 'password-input',
        expectedLabel: 'Password input'
      },
      {
        testId: 'email-label',
        expectedLabel: 'Email'
      },
      {
        testId: 'password-label',
        expectedLabel: 'Password'
      },
      {
        testId: 'login-button',
        expectedLabel: 'Log in'
      },
      {
        testId: 'forgot-password-button',
        expectedLabel: 'Forgot password'
      },
      {
        testId: 'login-title',
        expectedLabel: 'Welcome Back'
      }
    ];

    // List of test IDs that are intentionally not tested
    const ignoredTestIds = ['login-scroll-view'];

    it('should have correct accessibility labels for all elements', () => {
      // Arrange
      render(<LoginScreen />);

      // Assert
      accessibilityTestCases.forEach(({ testId, expectedLabel }) => {
        expect(screen.getByTestId(testId)).toHaveAccessibleName(expectedLabel);
      });
    });

    it('should test accessibility for all elements with test IDs', () => {
      // Arrange
      render(<LoginScreen />);

      // Get all elements with test IDs
      const allTestIds = accessibilityTestCases.map(({ testId }) => testId);
      const allElements = screen.getAllByTestId(/.*/);
      const untestedTestIds = allElements
        .map((element) => element.props.testID)
        .filter((testId) => !allTestIds.includes(testId) && !ignoredTestIds.includes(testId));

      // Assert
      expect(untestedTestIds).toHaveLength(0);
      if (untestedTestIds.length > 0) {
        throw new Error(
          `Found untested elements with test IDs: ${untestedTestIds.join(', ')}. ` +
            'Please add them to either accessibilityTestCases or ignoredTestIds.'
        );
      }
    });
  });
});
