import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { EllipsizeMode, Icon, Text } from "../../../components";
import { getCurrentColor } from "../../../models";
import { Theme, useRootSelector } from "../../../utils";
import { Item } from "./List";
import { ListSection } from "./ListSection";

interface Props {
  showSection: boolean;
  item: Item;
  onItemPress(item: Item): void;
}

export const ListItem = memo(({ showSection, item, onItemPress }: Props) => {
  const color = useRootSelector(state => getCurrentColor(state));
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          height: Theme.padding.p10,
          paddingHorizontal: Theme.padding.p04,
          paddingVertical: Theme.padding.p02
        }}
        onPress={() => onItemPress(item)}
      >
        <View
          style={{
            flexDirection: "row",
            width: Theme.padding.p20
          }}
        >
          <Icon
            name="checkbox-blank-circle"
            size={14}
            color={color.success}
            style={{ paddingRight: Theme.padding.p01 }}
          />
          <Text title={`${item.hour} ${item.zone}`} />
        </View>
        <Text
          style={{
            color: color.secondary,
            flex: 1
          }}
          body1
          numberOfLines={1}
          ellipsizeMode={EllipsizeMode.Tail}
        />
      </TouchableOpacity>
      {showSection && <ListSection item={item} />}
    </View>
  );
});
