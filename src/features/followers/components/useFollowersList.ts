import { useState } from "react";

type UseFollowersListProps = {
  onManagePress: () => void;
};

export const useFollowersList = ({ onManagePress }: UseFollowersListProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleManagePress = () => {
    setIsModalVisible(true);
    onManagePress();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    handleManagePress,
    handleCloseModal,
  };
};
