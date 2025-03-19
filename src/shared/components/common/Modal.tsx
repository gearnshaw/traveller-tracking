import React from "react";
import { View, Text, Pressable, Modal as RNModal } from "react-native";
import { tw } from "@/shared/utils/tw";

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
          <Text style={tw`text-xl font-semibold mb-4`}>{title}</Text>
          {children}
          <View style={tw`flex-row justify-end gap-3 mt-6`}>
            <Pressable
              onPress={onClose}
              style={tw`bg-gray-200 rounded-lg py-3 px-4`}
            >
              <Text style={tw`text-gray-700 font-medium`}>Cancel</Text>
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
                <Text
                  style={tw`${
                    actionButton.variant === "secondary"
                      ? "text-gray-700"
                      : "text-white"
                  } font-medium`}
                >
                  {actionButton.label}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
