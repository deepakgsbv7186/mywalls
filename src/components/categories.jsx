import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import categoriesList from "../constants/categoriesList";
import { theme } from "../utils/Theme";

export default function Categories() {
  return (
    <FlatList
      horizontal
      data={categoriesList}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatlistContainer}
      renderItem={({ item, index }) => (
        <CategoryPill title={item} currentIndex={index} />
      )}
    />
  );
}

const CategoryPill = ({ title, currentIndex }) => {
  return (
    <View>
      <Pressable style={styles.pillContainer}>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: theme.sizes.sm12,
    gap: theme.sizes.lg16 / 2,
    paddingVertical: theme.sizes.xs10 / 10,
  },
  pillContainer: {
    padding: theme.sizes.xs10,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.lg16,
    borderCurve: "continuous",
  },
  title: {
    fontFamily: theme.fonts.Poppins500,
    fontSize: theme.fontsize.md14,
    color: theme.colors.black,
  },
});
