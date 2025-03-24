import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { ReactNode } from "react";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const Button = ({
  children,
  variant = "primary",
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#8E8E93",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  outlineText: {
    color: "#007AFF",
  },
});
