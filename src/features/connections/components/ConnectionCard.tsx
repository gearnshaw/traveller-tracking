import { View, Text } from 'react-native';
import tw from 'twrnc';
import { Connection } from '../types';
import { Card } from '@/shared/components/base/Card';
import { CardHeader } from '@/shared/components/common/CardHeader';
import { Typography } from '@/shared/components/base/Typography';
import Clock from '@/shared/components/base/Clock';

type ConnectionCardProps = {
  connection: Connection;
};

export const ConnectionCard = ({ connection }: ConnectionCardProps) => {
  // Get first letter of name for avatar
  const initial = connection.name.charAt(0);

  return (
    <Card style={tw`px-0 overflow-hidden`}>
      <CardHeader title={connection.name} />

      {/* Content */}
      <View style={tw`p-4 flex-row`}>
        {/* Avatar */}
        <View style={tw`w-16 h-16 rounded-full bg-blue-100 items-center justify-center mr-4`}>
          <Text style={tw`text-2xl text-blue-500`}>{initial}</Text>
        </View>

        {/* Info */}
        <View style={tw`flex-1`}>
          <Typography variant="cardSubheader">Tokyo, Japan</Typography>
          <Typography variant="body" style={tw`mt-1`}>
            <Clock /> • 16°C, Clear Night
          </Typography>
          <Typography variant="secondary" style={tw`mt-2 text-gray-500`}>
            Updated 2 hours ago
          </Typography>
        </View>
      </View>
    </Card>
  );
};
