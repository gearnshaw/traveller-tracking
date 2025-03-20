import React from "react";
import { View, Text } from "react-native";
import { tw } from "@/shared/utils/tw";
import { Follower } from "../types";
import Modal from "@/shared/components/common/Modal";
import { useFollowersList } from "./useFollowersList";
import { TableRow } from "@/shared/components/base/TableRow";
import { Card } from "@/shared/components/base/Card";
import { TableSectionHeader } from "@/shared/components/base/TableSectionHeader";

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
              <Text style={tw`text-lg`}>{follower.name}</Text>
              <Text
                style={tw`text-base ${
                  follower.status === "active"
                    ? "text-green-500"
                    : "text-amber-500"
                }`}
              >
                {follower.status === "active" ? "Active" : "Pending"}
              </Text>
            </TableRow>
          ))}
        </Card>
      </View>

      <Modal
        visible={isModalVisible}
        onClose={handleCloseModal}
        title="Manage Followers"
      >
        <Text style={tw`text-base`}>
          TODO: Implement follower management functionality
        </Text>
      </Modal>
    </>
  );
};

export default FollowersList;
