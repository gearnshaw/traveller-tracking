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
    <View style={tw`px-4 py-3 flex-row justify-between items-center`}>
      <Typography variant="sectionHeader">{title}</Typography>
      {actionText && onActionPress && (
        <Pressable onPress={onActionPress}>
          <Typography variant="body" style={tw`text-primary-600`}>
            {actionText}
          </Typography>
        </Pressable>
      )}
    </View>
  );
};
