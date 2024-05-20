import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../utils/Theme";

export default function ColorsView({ title, data, filters, setFilters }) {
  const onSelect = (item) => {
    setFilters({ ...filters, [title]: item });
  };
  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContainer}>
        {data &&
          data?.map((item, index) => {
            let isActive = filters && filters[title] === item;
            let borderColor = isActive ? item : theme.colors.white;
            return (
              <Pressable
                key={index}
                style={[styles.btnContainer, { borderColor }]}
                onPress={() => onSelect(item)}
              >
                <View style={[styles.bgColor, { backgroundColor: item }]} />
              </Pressable>
            );
          })}
      </View>
    </>
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
    borderWidth: 3,
    borderRadius: theme.sizes.sm12,
    borderCurve: "continuous",
    padding: theme.sizes.sm12 / 3,
  },
  bgColor: {
    width: theme.sizes.xs10 * 4,
    height: theme.sizes.lg16 * 2,
    borderRadius: theme.sizes.xs10,
    borderCurve: "continuous",
  },
});
