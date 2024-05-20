import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../utils/Theme";

export default function SectionView({ title, data, filters, setFilters }) {
  const onSelect = (item) => {
    setFilters({ ...filters, [title]: item });
  };
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContainer}>
        {data &&
          data?.map((item, index) => {
            let isActive = filters && filters[title] === item;
            let backgroundColor = isActive
              ? theme.colors.neutral(0.8)
              : theme.colors.grayBG;
            let color = isActive
              ? theme.colors.white
              : theme.colors.neutral(0.8);
            return (
              <Pressable
                key={index}
                style={[styles.btnContainer, { backgroundColor }]}
                onPress={() => onSelect(item)}
              >
                <Text style={[styles.btnText, { color }]}>{item}</Text>
              </Pressable>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: theme.fonts.Poppins500,
    fontSize: theme.fontsize.lg16,
    color: theme.colors.neutral(0.8),
    textTransform: "capitalize",
    paddingVertical: theme.verticalsizes.xs10 / 2,
  },
  sectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.sizes.sm12,
  },
  btnContainer: {
    borderRadius: theme.sizes.sm12,
    borderCurve: "continuous",
    paddingVertical: theme.verticalsizes.xs10,
    paddingHorizontal: theme.sizes.sm12,
  },
  btnText: {
    fontFamily: theme.fonts.Poppins600,
    fontSize: theme.fontsize.md14,
    textTransform: "capitalize",
  },
});
