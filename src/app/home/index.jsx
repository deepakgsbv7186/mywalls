import { Feather, Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { callApi } from "../../api";
import Categories from "../../components/categories";
import { theme } from "../../utils/Theme";
import ImageGrid from "./ImageGrid";
import FilterModal from "./FilterModal";

let page = 1;
export default function Home() {
  const searchRef = useRef(null);
  const modalRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState({});
  console.log("🚀 ~ Home ~ filters:", filters);

  const handleChangeCategory = (_category) => {
    setActiveCategory(_category);
    setImages([]);
    page = 1;
    let params = { page };
    if (_category) params.category = _category;
    fetchImages(params, false);
  };

  const fetchImages = async (params = { page: 1 }, append = false) => {
    console.log("🚀 ~ fetchImages ~ params:", params);

    let result = await callApi(params);
    if (result?.success && result?.data?.hits) {
      if (append) {
        setImages([...images, ...result?.data?.hits]);
      } else {
        setImages([...result?.data?.hits]);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text }, false);
    }
    if (text === "") {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      searchRef.current.clear();
      fetchImages({ page }, false);
    }
  };

  const handleSearchDebounce = useCallback(debounce(handleSearch, 400), []);
  const handlePresentModalPress = useCallback(() => {
    modalRef.current?.present();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Pressable>
          <Text style={styles.titleText}>My Walls</Text>
        </Pressable>
        <Pressable onPress={handlePresentModalPress}>
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
            ref={searchRef}
            placeholder="Search for wallpapers..."
            style={styles.searchInput}
            maxLength={30}
            onChangeText={handleSearchDebounce}
          />
          {searchText && (
            <Pressable onPress={() => handleSearch("")}>
              <Ionicons
                name="close"
                size={theme.fontsize.sm12 * 2}
                color={theme.colors.neutral(0.5)}
              />
            </Pressable>
          )}
        </View>
        <View>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <View>{images?.length > 0 && <ImageGrid images={images} />}</View>
        <FilterModal
          modalRef={modalRef}
          filters={filters}
          setFilters={setFilters}
        />
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
