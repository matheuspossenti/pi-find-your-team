import React from "react";
import { Text, View, type ColorValue } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";

interface Props {
  label: string;
  value: string;
  colorValue?: ColorValue;
}

export function TeamInfo({
  label,
  value,
  colorValue = THEME.COLORS.TEXT,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: colorValue }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
