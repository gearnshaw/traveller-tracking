import { View, Pressable } from 'react-native';
import { tw } from '@/shared/utils/tw';
import { Typography } from './Typography';

export type TableSectionHeaderProps = {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
};

export const TableSectionHeader = ({
  title,
  actionText,
  onActionPress
}: TableSectionHeaderProps) => {
  return (
    <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
      <View style={tw`flex-1 min-w-0`}>
        <Typography variant="sectionHeader">{title}</Typography>
      </View>
      {actionText && onActionPress && (
        <View style={tw`ml-4`}>
          <Pressable onPress={onActionPress}>
            <Typography variant="body" style={tw`text-primary-600`}>
              {actionText}
            </Typography>
          </Pressable>
        </View>
      )}
    </View>
  );
};
