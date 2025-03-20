import React from "react";
import { View } from "react-native";
import { tw } from "@/shared/utils/tw";
import { Follower } from "../types";
import Modal from "@/shared/components/common/Modal";
import { useFollowersList } from "./useFollowersList";
import { TableRow } from "@/shared/components/base/TableRow";
import { Card } from "@/shared/components/base/Card";
import { TableSectionHeader } from "@/shared/components/base/TableSectionHeader";
import { Typography } from "@/shared/components/base/Typography";

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

        <Card>
          {followers.map((follower, index) => (
            <TableRow key={follower.id} isFirstRow={index === 0}>
              <Typography variant="body1">{follower.name}</Typography>
              <Typography
                variant="body1"
                style={tw`${
                  follower.status === "active"
                    ? "text-green-500"
                    : "text-amber-500"
                }`}
              >
                {follower.status === "active" ? "Active" : "Pending"}
              </Typography>
            </TableRow>
          ))}
        </Card>
      </View>

      <Modal
        visible={isModalVisible}
        onClose={handleCloseModal}
        title="Manage Followers"
      >
        <Typography variant="body1">
          TODO: Implement follower management functionality
        </Typography>
      </Modal>
    </>
  );
};

export default FollowersList;
