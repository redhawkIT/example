import { MutableRefObject, useRef } from 'react';
import {
  GestureResponderHandlers,
  PanResponder,
  PanResponderInstance,
} from 'react-native';

export type Direction = 'left' | 'right' | 'up' | 'down';

type Props = {
  noReverse?: boolean;
};

const inverse: { [key: string]: Direction } = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up',
};

export const useGesture = ({
  noReverse,
}: Props): {
  direction: MutableRefObject<Direction>;
  panHandlers: GestureResponderHandlers;
} => {
  const direction = useRef<Direction>('up');
  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, g) => {
      let direct: Direction = 'up';
      if (Math.abs(g.dx) >= Math.abs(g.dy))
        direct = g.dx >= 0 ? 'right' : 'left';
      else direct = g.dy >= 0 ? 'down' : 'up';

      const reverse = noReverse && inverse[direct] === direction.current;
      direction.current = reverse ? direction.current : direct;
    },
  });

  return { direction, panHandlers: panResponder.panHandlers };
};
