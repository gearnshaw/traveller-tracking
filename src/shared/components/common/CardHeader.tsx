import { View } from 'react-native';
import tw from 'twrnc';
import { Typography } from '@/shared/components/base/Typography';

type CardHeaderProps = {
  title: string;
  backgroundColor?: string;
  textColor?: string;
};

export const CardHeader = ({
  title,
  backgroundColor = 'bg-blue-500',
  textColor = 'text-white'
}: CardHeaderProps) => {
  return (
    <View style={tw`${backgroundColor} p-4`}>
      <Typography variant="cardTitle" style={tw`${textColor}`}>
        {title}
      </Typography>
    </View>
  );
};
