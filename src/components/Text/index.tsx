import * as React from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";
import { getCurrentColor } from "../../models";
import { Theme } from "../../utils";
import { useRootSelector } from "../../utils";

interface Props {
  title?: string;
  style?: ViewStyle | {};

  center?: boolean;
  centerVertically?: boolean;
  bold?: boolean;
  hidden?: boolean;
  invisible?: boolean;

  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  subtitle1?: boolean;
  subtitle2?: boolean;
  body1?: boolean;
  body2?: boolean;
  button?: boolean;
  caption?: boolean;
  overline?: boolean;
  onPress?(): void;
}

export const Text = (props: Props) => {
  const {
    style,
    title,
    center,
    bold,
    hidden,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    subtitle1,
    subtitle2,
    body1,
    body2,
    button,
    caption,
    onPress,
    centerVertically,
    invisible,
    overline
  } = props;
  const opacity = new Animated.Value(1);
  const colors = useRootSelector(state => getCurrentColor(state));
  const styles = StyleSheet.create({
    bold: {
      fontWeight: Theme.fontWeight.medium
    },
    center: {
      textAlign: "center"
    },
    centerVertically: {
      flex: 1,
      textAlignVertical: "center"
    },
    invisible: {
      opacity: 0
    },
    text: {
      color: colors.text
    }
  });
  const text = button || overline ? (title || "").toUpperCase() : title;
  const getFont = () => {
    return h1
      ? Theme.fontSize.h1
      : h2
      ? Theme.fontSize.h2
      : h3
      ? Theme.fontSize.h3
      : h4
      ? Theme.fontSize.h4
      : h5
      ? Theme.fontSize.h5
      : h6
      ? Theme.fontSize.h6
      : subtitle1
      ? Theme.fontSize.subtitle1
      : subtitle2
      ? Theme.fontSize.subtitle2
      : body1
      ? Theme.fontSize.body1
      : body2
      ? Theme.fontSize.body2
      : button
      ? Theme.fontSize.button
      : caption
      ? Theme.fontSize.caption
      : overline
      ? Theme.fontSize.overline
      : Theme.fontSize.body2;
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    Animated.sequence([
      Animated.timing(opacity, {
        duration: 50,
        toValue: 0.2,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        duration: 350,
        toValue: 1,
        useNativeDriver: true
      })
    ]).start();
  };

  const textStyle = [
    styles.text,
    getFont(),
    center && styles.center,
    centerVertically && styles.centerVertically,
    bold && styles.bold,
    invisible && styles.invisible,
    { opacity },
    style
  ];

  return title === undefined || hidden ? null : (
    <Animated.Text
      style={textStyle}
      onPress={onPress ? handlePress : undefined}
    >
      {text}
    </Animated.Text>
  );
};
