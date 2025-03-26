import React from 'react';
import { Text, TextProps } from 'react-native';
import { tw } from '@/shared/utils/tw';

export type TypographyVariant = 'pageTitle' | 'cardTitle' | 'sectionHeader' | 'body' | 'secondary';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
}

const variantStyles: Record<TypographyVariant, string> = {
  pageTitle: 'text-4xl font-bold',
  cardTitle: 'text-2xl font-bold',
  sectionHeader: 'text-xl font-semibold',
  body: 'text-base',
  secondary: 'text-sm'
};

export const Typography = ({ variant = 'body', style, ...props }: TypographyProps) => {
  return <Text style={[tw`${variantStyles[variant]}`, style]} {...props} />;
};
