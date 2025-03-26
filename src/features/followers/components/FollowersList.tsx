import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from '@/shared/components/common/Modal';
import { TableSectionHeader } from '@/shared/components/base/TableSectionHeader';
import { Typography } from '@/shared/components/base/Typography';
import { Table } from '@/shared/components/common/Table';
import { FollowerRow } from './FollowerRow';
import { tw } from '@/shared/utils/tw';
import { useFollowersList } from './useFollowersList';

const FollowersList = () => {
  const { followers, isLoading, isModalVisible, handleManagePress, handleCloseModal } =
    useFollowersList({
      onManagePress: () => {
        // Will implement later
      }
    });

  return (
    <>
      <View>
        <TableSectionHeader
          title="Who Can See My Location"
          actionText="Manage"
          onActionPress={handleManagePress}
        />

        {isLoading ? (
          <View style={tw`py-8 items-center`}>
            <ActivityIndicator size="large" color={tw.color('primary-500')} />
          </View>
        ) : (
          <Table>
            {followers.map((follower, index) => (
              <FollowerRow key={follower.id} follower={follower} isFirstRow={index === 0} />
            ))}
          </Table>
        )}
      </View>

      <Modal visible={isModalVisible} onClose={handleCloseModal} title="Manage Followers">
        <Typography variant="body">TODO: Implement follower management functionality</Typography>
      </Modal>
    </>
  );
};

export default FollowersList;
