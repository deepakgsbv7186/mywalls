import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { theme } from "../../utils/Theme";
import Categories from "../../components/categories";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Pressable>
          <Text style={styles.titleText}>My Walls</Text>
        </Pressable>
        <Pressable>
          <Ionicons name="filter" size={24} color={theme.colors.neutral(0.7)} />
        </Pressable>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ gap: theme.verticalsizes.lg16 }}
      >
        <View style={styles.searchInputContainer}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={theme.fontsize.sm12 * 2}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for wallpapers..."
            style={styles.searchInput}
            maxLength={30}
            value={searchText}
            onChangeText={(search) => setSearchText(search)}
          />
          {searchText && (
            <Pressable onPress={() => setSearchText("")}>
              <Ionicons
                name="close"
                size={theme.fontsize.sm12 * 2}
                color={theme.colors.neutral(0.5)}
              />
            </Pressable>
          )}
        </View>
        <View>
          <Categories />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.statusbarSize,
    backgroundColor: theme.colors.white,
  },
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.sizes.sm12,
    paddingVertical: theme.verticalsizes.xs10,
  },
  titleText: {
    fontSize: theme.fontsize.lg16 * 2,
    color: theme.colors.neutral(0.9),
    fontFamily: theme.fonts.Poppins600,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.verticalsizes.sm12 / 2,
    marginHorizontal: theme.sizes.sm12,
    padding: theme.sizes.lg16 / 2,
    borderColor: theme.colors.neutral(0.2),
    borderWidth: 1,
    borderRadius: theme.sizes.xs10,
    borderCurve: "continuous",
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.fonts.Poppins400,
    fontSize: theme.fontsize.lg16,
    color: theme.colors.neutral(0.7),
  },
});
