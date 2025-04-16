import { View, ActivityIndicator } from 'react-native';
import { useConnections } from '../hooks/useConnections';
import { ConnectionCard } from './ConnectionCard';
import { TableSectionHeader } from '@/shared/components/base/TableSectionHeader';
import { Typography } from '@/shared/components/base/Typography';
import tw from 'twrnc';

export const ConnectionsList = () => {
  const { connections, isLoading, error } = useConnections();

  if (isLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color={tw.color('primary-500')} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Typography variant="body" style={tw`text-red-500`}>
          Error: {error.message}
        </Typography>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <TableSectionHeader
        title="Connections"
        actionText="Manage"
        onActionPress={() => {
          // TODO: Implement traveller management
        }}
      />
      {connections.map((connection) => (
        <View key={connection.id} style={tw`mb-4 last:mb-0`}>
          <ConnectionCard connection={connection} />
        </View>
      ))}
    </View>
  );
};
