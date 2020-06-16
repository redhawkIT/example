import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Theme} from '../../utils';
import {Icon} from '../Icon';
import {useColor} from '../../hooks';

interface Props {
  icon: string;
  isRight?: boolean;
  onPress?(): void;
}

export var NavButton = ({onPress, icon, isRight}: Props) => {
  const color = useColor();
  const styles = StyleSheet.create({
    button: {
      flex: 0.2,
      padding: Theme.padding.p03,
    },
    buttonRight: {
      alignSelf: 'flex-end',
    },
  });
  return (
    <View style={styles.button}>
      <Icon
        color={color.secondary}
        hidden={!onPress}
        name={icon}
        onPress={onPress}
        size={Theme.padding.p09}
        style={isRight && styles.buttonRight}
      />
    </View>
  );
};
