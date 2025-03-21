import React from "react";
import { View, Pressable, Modal as RNModal } from "react-native";
import { tw } from "@/shared/utils/tw";
import { Typography } from "../base/Typography";

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actionButton?: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
  };
};

const Modal = ({
  visible,
  onClose,
  title,
  children,
  actionButton,
}: ModalProps) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 justify-center items-center bg-black/50`}>
        <View style={tw`bg-white rounded-2xl p-6 m-4 w-5/6 max-w-lg`}>
          <Typography variant="sectionHeader" style={tw`mb-4`}>
            {title}
          </Typography>
          {children}
          <View style={tw`flex-row justify-end gap-3 mt-6`}>
            <Pressable
              onPress={onClose}
              style={tw`bg-gray-200 rounded-lg py-3 px-4`}
            >
              <Typography variant="body" style={tw`text-gray-700`}>
                Cancel
              </Typography>
            </Pressable>
            {actionButton && (
              <Pressable
                onPress={actionButton.onPress}
                style={tw`${
                  actionButton.variant === "secondary"
                    ? "bg-gray-200"
                    : "bg-primary-600"
                } rounded-lg py-3 px-4`}
              >
                <Typography
                  variant="body"
                  style={tw`${
                    actionButton.variant === "secondary"
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                >
                  {actionButton.label}
                </Typography>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
