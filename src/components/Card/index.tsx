import React, { memo, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { padding } from '../../features/Config';
import { useColor, useDropShadow } from '../../features/Theme';
import { TouchableOpacity } from '../TouchableOpacity';

type Props = {
  borderRadius?: number;
  borderWidth?: number;
  children?: ReactNode | ReactNode[];
  elevation?: number;
  flex?: boolean;
  noMargin?: boolean;
  noPadding?: boolean;
  onLongPress?: () => void;
  onPress?: () => void;
  selected?: boolean;
  style?: ViewStyle;
  testID?: string;
};

const getOpacity = (elevation: number) =>
  elevation === 0
    ? 0
    : elevation === 1
    ? 0.05
    : ((elevation - 2) * 0.01 + 0.07).toFixed(2);
const touchOpacity = 0.3;

export const Card = memo(function Card({
  testID,
  borderRadius = padding(2),
  borderWidth = 1,
  children,
  elevation = 2,
  onLongPress,
  onPress,
  noMargin,
  noPadding,
  flex,
  selected,
  style,
}: Props) {
  const color = useColor();
  const dropShadow = useDropShadow();
  const opacity = getOpacity(elevation);
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: color.background.primaryA,
      borderColor: color.background.primaryA,
      borderRadius,
      borderWidth,
      marginVertical: noMargin ? 0 : padding(2),
      ...dropShadow(elevation),
    },
    contents: {
      backgroundColor: `hsla(0,0%,100%,${opacity})`,
      borderRadius,
      padding: noPadding ? 0 : padding(4),
    },
    flex: {
      flex: 1,
    },
    selected: { backgroundColor: color.background.positive },
  });

  const containerStyles = [
    styles.containerStyle,
    selected ? styles.selected : undefined,
    flex ? styles.flex : undefined,
    style,
  ];
  const contentStyles = [styles.contents, flex ? styles.flex : undefined];
  const child = <View style={contentStyles}>{children}</View>;

  return onPress || onLongPress ? (
    <TouchableOpacity
      activeOpacity={onPress ? touchOpacity : 1}
      onLongPress={onLongPress}
      onPress={onPress}
      style={containerStyles}
      testID={testID}
    >
      {child}
    </TouchableOpacity>
  ) : (
    <View style={containerStyles} testID={testID}>
      {child}
    </View>
  );
});
