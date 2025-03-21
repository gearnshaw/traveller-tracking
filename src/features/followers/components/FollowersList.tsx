import React from "react";
import { View } from "react-native";
import { Follower } from "../types";
import Modal from "@/shared/components/common/Modal";
import { useFollowersList } from "./useFollowersList";
import { TableSectionHeader } from "@/shared/components/base/TableSectionHeader";
import { Typography } from "@/shared/components/base/Typography";
import { Table } from "@/shared/components/common/Table";
import { FollowerRow } from "./FollowerRow";

type FollowersListProps = {
  followers: Follower[];
  onManagePress: () => void;
};

const FollowersList = ({ followers, onManagePress }: FollowersListProps) => {
  const { isModalVisible, handleManagePress, handleCloseModal } =
    useFollowersList({
      onManagePress,
    });

  return (
    <>
      <View>
        <TableSectionHeader
          title="Who Can See My Location"
          actionText="Manage"
          onActionPress={handleManagePress}
        />

        <Table>
          {followers.map((follower, index) => (
            <FollowerRow
              key={follower.id}
              follower={follower}
              isFirstRow={index === 0}
            />
          ))}
        </Table>
      </View>

      <Modal
        visible={isModalVisible}
        onClose={handleCloseModal}
        title="Manage Followers"
      >
        <Typography variant="body">
          TODO: Implement follower management functionality
        </Typography>
      </Modal>
    </>
  );
};

export default FollowersList;
