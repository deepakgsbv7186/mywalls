import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import categoriesList from "../constants/categoriesList";
import { theme } from "../utils/Theme";

export default function Categories({ activeCategory, handleChangeCategory }) {
  return (
    <FlatList
      horizontal
      data={categoriesList}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatlistContainer}
      renderItem={({ item, index }) => (
        <CategoryPill
          title={item}
          currentIndex={index}
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  );
}

const CategoryPill = ({
  title,
  currentIndex,
  isActive,
  handleChangeCategory,
}) => {
  const color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  const backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  return (
    <Animated.View
      entering={FadeInRight.delay(currentIndex * 200)
        .duration(2000)
        .springify()
        .damping(14)}
    >
      <Pressable
        onPress={() => handleChangeCategory(isActive ? null : title)}
        style={[styles.pillContainer, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
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
