import { View, ViewProps } from "react-native";
import { tw } from "@/shared/utils/tw";

export type TableRowProps = ViewProps & {
  isFirstRow?: boolean;
};

export const TableRow = ({
  children,
  isFirstRow = false,
  style,
  ...props
}: TableRowProps) => {
  return (
    <View
      style={[
        tw`py-4 flex-row justify-between items-center`,
        !isFirstRow && tw`border-t border-gray-200`,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
