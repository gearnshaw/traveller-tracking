import { useState } from 'react';
import { useFollowers } from '../hooks/useFollowers';

type UseFollowersListProps = {
  onManagePress: () => void;
};

export const useFollowersList = ({ onManagePress }: UseFollowersListProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { followers, isLoading } = useFollowers();

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
    followers,
    isLoading
  };
};
