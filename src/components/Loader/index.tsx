import React, { useEffect, useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "../Text";

interface Props {
  title: string;
  center?: boolean;
  style?: ViewStyle;
}

const ellipsis = ["", ".", ".", "."];
const ellipsisDuration = 400;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  center: {
    justifyContent: "center"
  }
});

export const Loader: React.FC<Props> = props => {
  const { title, center, style } = props;
  let ellipsisCountdown: any = 0;
  const containerStyles = [
    styles.row,
    center ? styles.center : undefined,
    style
  ];
  const [ellipsisIndex, setEllipsisIndex] = useState(1);
  const animateTextNextIndex = (index: number) =>
    index >= ellipsis.length - 1 ? 0 : index + 1;
  const animateText = () => {
    ellipsisCountdown = setTimeout(() => {
      setEllipsisIndex(index => animateTextNextIndex(index));
      animateText();
    }, ellipsisDuration);
  };

  useEffect(() => {
    animateText();
    return () => clearTimeout(ellipsisCountdown);
  }, []);

  return (
    <View style={containerStyles}>
      <Text title={title} h3 bold center />
      {ellipsis.map((dot, index) => (
        <Text
          key={index}
          title={dot}
          invisible={index > ellipsisIndex}
          h3
          bold
          center
        />
      ))}
    </View>
  );
};
