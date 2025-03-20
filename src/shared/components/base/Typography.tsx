import { Text, TextProps, TextStyle } from "react-native";
import { tw } from "@/shared/utils/tw";

type TypographyVariant =
  | "h1" // text-4xl font-bold
  | "h2" // text-3xl font-bold
  | "h3" // text-2xl font-bold
  | "h4" // text-xl font-semibold
  | "body1" // text-base
  | "body2" // text-sm
  | "button" // text-base text-primary-600
  | "caption"; // text-xs

export type TypographyProps = TextProps & {
  variant?: TypographyVariant;
};

const variantStyles: Record<TypographyVariant, TextStyle> = {
  h1: tw`text-4xl font-bold`,
  h2: tw`text-3xl font-bold`,
  h3: tw`text-2xl font-bold`,
  h4: tw`text-xl font-semibold`,
  body1: tw`text-base`,
  body2: tw`text-sm`,
  button: tw`text-base text-primary-600`,
  caption: tw`text-xs`,
};

export const Typography = ({
  variant = "body1",
  style,
  ...props
}: TypographyProps) => {
  return <Text style={[variantStyles[variant], style]} {...props} />;
};
