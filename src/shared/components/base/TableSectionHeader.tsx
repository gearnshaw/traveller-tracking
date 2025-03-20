import { View, Text, Pressable, PressableProps } from "react-native";
import { tw } from "@/shared/utils/tw";

export type TableSectionHeaderProps = {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
};

export const TableSectionHeader = ({
  title,
  actionText,
  onActionPress,
}: TableSectionHeaderProps) => {
  return (
    <View style={tw`px-4 py-3 flex-row justify-between items-center`}>
      <Text style={tw`text-xl font-semibold`}>{title}</Text>
      {actionText && onActionPress && (
        <Pressable onPress={onActionPress}>
          <Text style={tw`text-primary-600 text-base`}>{actionText}</Text>
        </Pressable>
      )}
    </View>
  );
};
