import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const buttonStyles = [
    styles.base,
    styles[size],
    variantStyles[variant],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [styles.text, textVariantStyles[variant], disabled && styles.textDisabled];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: Colors.light.border,
  },
  textDisabled: {
    color: Colors.light.icon,
  },
});

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: Colors.light.tint,
  },
  secondary: {
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.tint,
    borderWidth: 1,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: Colors.light.tint,
    borderWidth: 1,
  },
};

const textVariantStyles: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: '#fff',
  },
  secondary: {
    color: Colors.light.tint,
  },
  outline: {
    color: Colors.light.tint,
  },
};
