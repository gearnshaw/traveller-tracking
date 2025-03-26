// import { render, fireEvent } from "@testing-library/react-native";
// import { LoginScreen } from "./LoginScreen";
// import { useLoginScreen } from "./useLoginScreen";

// // Mock the hook
// jest.mock("./useLoginScreen", () => ({
//   useLoginScreen: jest.fn(),
// }));

// // Mock Alert
// jest.mock("react-native", () => {
//   const RN = jest.requireActual("react-native");
//   return {
//     ...RN,
//     Alert: {
//       alert: jest.fn(),
//     },
//   };
// });

// describe("LoginScreen", () => {
//   // Default mock implementation
//   const mockUseLoginScreen = {
//     email: "",
//     setEmail: jest.fn(),
//     password: "",
//     setPassword: jest.fn(),
//     loading: false,
//     handleLogin: jest.fn(),
//     handleForgotPassword: jest.fn(),
//   };

//   beforeEach(() => {
//     // Reset mock before each test
//     jest.clearAllMocks();
//     (useLoginScreen as jest.Mock).mockReturnValue(mockUseLoginScreen);
//   });

//   it("renders all UI elements correctly", () => {
//     const { getByTestId, getByText } = render(<LoginScreen />);

//     // Check for presence of all UI elements
//     expect(getByTestId("login-screen")).toBeTruthy();
//     expect(getByTestId("login-scroll-view")).toBeTruthy();
//     expect(getByTestId("login-title")).toBeTruthy();
//     expect(getByTestId("email-label")).toBeTruthy();
//     expect(getByTestId("email-input")).toBeTruthy();
//     expect(getByTestId("password-label")).toBeTruthy();
//     expect(getByTestId("password-input")).toBeTruthy();
//     expect(getByTestId("forgot-password-button")).toBeTruthy();
//     expect(getByTestId("login-button")).toBeTruthy();

//     // Check text content
//     expect(getByText("Welcome Back")).toBeTruthy();
//     expect(getByText("Email")).toBeTruthy();
//     expect(getByText("Password")).toBeTruthy();
//     expect(getByText("Forgot Password?")).toBeTruthy();
//     expect(getByText("Log In")).toBeTruthy();
//   });

//   it("handles email input changes", () => {
//     const { getByTestId } = render(<LoginScreen />);
//     const emailInput = getByTestId("email-input");

//     fireEvent.changeText(emailInput, "test@example.com");
//     expect(mockUseLoginScreen.setEmail).toHaveBeenCalledWith(
//       "test@example.com"
//     );
//   });

//   it("handles password input changes", () => {
//     const { getByTestId } = render(<LoginScreen />);
//     const passwordInput = getByTestId("password-input");

//     fireEvent.changeText(passwordInput, "password123");
//     expect(mockUseLoginScreen.setPassword).toHaveBeenCalledWith("password123");
//   });

//   it("handles login button press", () => {
//     const { getByTestId } = render(<LoginScreen />);
//     const loginButton = getByTestId("login-button");

//     fireEvent.press(loginButton);
//     expect(mockUseLoginScreen.handleLogin).toHaveBeenCalled();
//   });

//   it("handles forgot password button press", () => {
//     const { getByTestId } = render(<LoginScreen />);
//     const forgotPasswordButton = getByTestId("forgot-password-button");

//     fireEvent.press(forgotPasswordButton);
//     expect(mockUseLoginScreen.handleForgotPassword).toHaveBeenCalled();
//   });

//   it("disables login button and shows loading state", () => {
//     (useLoginScreen as jest.Mock).mockReturnValue({
//       ...mockUseLoginScreen,
//       loading: true,
//     });

//     const { getByTestId } = render(<LoginScreen />);
//     const loginButton = getByTestId("login-button");

//     expect(loginButton.props.disabled).toBe(true);
//     expect(loginButton.props.accessibilityState.disabled).toBe(true);
//   });

//   it("updates button text when loading", () => {
//     (useLoginScreen as jest.Mock).mockReturnValue({
//       ...mockUseLoginScreen,
//       loading: true,
//     });

//     const { getByText } = render(<LoginScreen />);
//     expect(getByText("Signing in...")).toBeTruthy();
//   });

//   it("has correct accessibility properties", () => {
//     const { getByTestId } = render(<LoginScreen />);

//     // Check email input accessibility
//     const emailInput = getByTestId("email-input");
//     expect(emailInput.props.accessibilityLabel).toBe("Email input");
//     expect(emailInput.props.accessibilityHint).toBe("Enter your email address");

//     // Check password input accessibility
//     const passwordInput = getByTestId("password-input");
//     expect(passwordInput.props.accessibilityLabel).toBe("Password input");
//     expect(passwordInput.props.accessibilityHint).toBe("Enter your password");

//     // Check forgot password button accessibility
//     const forgotPasswordButton = getByTestId("forgot-password-button");
//     expect(forgotPasswordButton.props.accessibilityRole).toBe("button");
//     expect(forgotPasswordButton.props.accessibilityLabel).toBe(
//       "Forgot password"
//     );
//     expect(forgotPasswordButton.props.accessibilityHint).toBe(
//       "Tap to reset your password"
//     );

//     // Check login button accessibility
//     const loginButton = getByTestId("login-button");
//     expect(loginButton.props.accessibilityRole).toBe("button");
//     expect(loginButton.props.accessibilityLabel).toBe("Log in");
//   });
// });
