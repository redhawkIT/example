import React, { memo, useCallback } from 'react';
import { v4 } from 'uuid';
import { Item } from './Item';

interface LocationItem {
  id: string;
  subtitle?: string;
  title: string;
}

type Props = {
  onPress: (value: string) => () => void;
};

export const Location = memo(function Location({ onPress }: Props) {
  const subtitle = 'Tap to add';
  const locations: LocationItem[] = [
    {
      id: v4(),
      title: 'Home',
      subtitle,
    },
    {
      id: v4(),
      title: 'Work',
      subtitle,
    },
    {
      id: v4(),
      title: 'Gym',
      subtitle,
    },
    {
      id: v4(),
      title: 'Add a new location',
    },
  ];

  const onItemPress = useCallback((index: string) => onPress(index), [onPress]);

  return (
    <>
      {locations.map((location, index) => (
        <Item
          description={location.subtitle}
          key={location.id}
          marginBottom={index !== locations.length - 1}
          onPress={onItemPress(location.id)}
          title={location.title}
        />
      ))}
    </>
  );
});
