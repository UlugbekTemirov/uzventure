import React from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  lightBorderColor,
  darkBorderColor,
  ...otherProps
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'border');

  return (
    <TextInput
      style={[{ backgroundColor, color, borderColor, borderWidth: 1 }, style]}
      placeholderTextColor={useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder')}
      {...otherProps}
    />
  );
}
