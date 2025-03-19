import React from "react";
import { View, Text, Pressable } from "react-native";
import { tw } from "@/shared/utils/tw";
import { Follower } from "../types";
import Modal from "@/shared/components/common/Modal";
import { useFollowersList } from "./useFollowersList";

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
      <View style={tw`bg-white rounded-2xl overflow-hidden`}>
        <View
          style={tw`bg-gray-100 px-4 py-3 flex-row justify-between items-center`}
        >
          <Text style={tw`text-xl font-semibold`}>Who Can See My Location</Text>
          <Pressable onPress={handleManagePress}>
            <Text style={tw`text-primary-600 text-base`}>Manage</Text>
          </Pressable>
        </View>

        <View style={tw`p-4`}>
          {followers.map((follower, index) => (
            <View
              key={follower.id}
              style={tw`py-4 ${
                index > 0 ? "border-t border-gray-200" : ""
              } flex-row justify-between items-center`}
            >
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
            </View>
          ))}
        </View>
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
