import { Feather, Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import FilterModal from "./FilterModal";
import ImageGrid from "./ImageGrid";

let page = 1;
export default function Home() {
  const searchRef = useRef(null);
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState({});
  const [isEndReached, setIsEndReached] = useState(false);

  const handleChangeCategory = (_category) => {
    setActiveCategory(_category);
    setImages([]);
    page = 1;
    let params = { page, ...filters };
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
      fetchImages({ page, q: text, ...filters }, false);
    }
    if (text === "") {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      searchRef.current.clear();
      fetchImages({ page, ...filters }, false);
    }
  };

  const handleSearchDebounce = useCallback(debounce(handleSearch, 400), []);
  const handlePresentModalPress = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1 && !isEndReached) {
      setIsEndReached(true);
      ++page;
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (searchText) params.q = searchText;
      fetchImages(params, true);
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };
  const handleScrollTop = (event) => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const resetFilters = () => {
    if (filters) {
      page = 1;
      setFilters({});
      setImages([]);
      let params = { page };
      if (activeCategory) params.category = activeCategory;
      if (searchText) params.q = searchText;
      fetchImages(params, false);
    }
    modalRef.current?.close();
  };
  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (searchText) params.q = searchText;
      fetchImages(params, false);
    }
    modalRef.current?.close();
  };
  const clearCurrentFilter = (filterName) => {
    let _filters = { ...filters };
    delete _filters[filterName];
    page = 1;
    setFilters({ ..._filters });
    setImages([]);
    let params = {
      page,
      ..._filters,
    };
    if (activeCategory) params.category = activeCategory;
    if (searchText) params.q = searchText;
    fetchImages(params, false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Pressable onPress={handleScrollTop}>
          <Text style={styles.titleText}>My Walls</Text>
        </Pressable>
        <Pressable onPress={handlePresentModalPress}>
          <Ionicons name="filter" size={24} color={theme.colors.neutral(0.7)} />
        </Pressable>
      </View>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        scrollEventThrottle={5}
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
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {Object.keys(filters).length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          >
            {Object.keys(filters).map((selected, index) => (
              <Pressable
                key={index}
                onPress={() => clearCurrentFilter(selected)}
                style={styles.selectedContainer}
              >
                {selected === "colors" ? (
                  <View
                    style={[
                      styles.bgColor,
                      { backgroundColor: filters[selected] },
                    ]}
                  />
                ) : (
                  <Text style={styles.selectedText}>{filters[selected]}</Text>
                )}
                <Ionicons
                  name="close"
                  size={theme.fontsize.lg16}
                  color={theme.colors.neutral(0.5)}
                />
              </Pressable>
            ))}
          </ScrollView>
        )}
        <View style={{ marginTop: -theme.sizes.sm12 / 2 }}>
          {images?.length > 0 && <ImageGrid images={images} />}
        </View>
        <View
          style={{
            marginBottom: theme.verticalsizes.md14 * 5,
            marginTop:
              images?.length > 0
                ? theme.verticalsizes.xs10
                : theme.verticalsizes.md14 * 5,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
        <FilterModal
          modalRef={modalRef}
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
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
  contentContainerStyle: {
    gap: theme.sizes.xs10,
    paddingHorizontal: theme.sizes.md14,
  },
  selectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.grayBG,
    paddingHorizontal: theme.sizes.sm12,
    paddingVertical: theme.verticalsizes.sm12 / 2,
    borderRadius: theme.sizes.lg16,
    borderCurve: "continuous",
    gap: theme.sizes.xs10 / 2,
  },
  selectedText: {
    fontFamily: theme.fonts.Poppins400,
    fontSize: theme.fontsize.md14,
    color: theme.colors.neutral(0.7),
  },
  bgColor: {
    width: theme.sizes.xs10 * 4,
    height: theme.sizes.lg16 * 1.5,
    borderRadius: theme.sizes.md14,
    borderCurve: "continuous",
    marginLeft: -theme.sizes.xs10 / 2,
  },
});
