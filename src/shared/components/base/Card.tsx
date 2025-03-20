import { View, ViewProps } from "react-native";
import { tw } from "@/shared/utils/tw";

export type CardProps = ViewProps;

export const Card = ({ children, style, ...props }: CardProps) => {
  const baseStyles = tw`bg-white rounded-3xl px-4 shadow-sm`;

  return (
    <View style={[baseStyles, style]} {...props}>
      {children}
    </View>
  );
};
