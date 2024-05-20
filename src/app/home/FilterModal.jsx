import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import ColorsView from "../../components/ColorsView";
import SectionView from "../../components/SectionView";
import filterList from "../../constants/filterList";
import { theme } from "../../utils/Theme";

export default function FilterModal({
  modalRef,
  setFilters,
  filters,
  applyFilters,
  resetFilters,
}) {
  const snapPoints = useMemo(() => ["75%"], []);
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableOverDrag={false}
      backdropComponent={CustomBackdrop}
      //   onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.entries(filterList).map(([title, data]) => {
            const Component = sections[title];
            return (
              <Component
                key={title}
                data={data}
                title={title}
                setFilters={setFilters}
                filters={filters}
              />
            );
          })}

          <View style={styles.bottomBtnContainer}>
            <Pressable
              style={[styles.btnContainer, { backgroundColor: "transparent" }]}
              onPress={resetFilters}
            >
              <Text
                style={{ ...styles.btnText, color: theme.colors.neutral(0.8) }}
              >
                Reset
              </Text>
            </Pressable>
            <Pressable style={styles.btnContainer} onPress={applyFilters}>
              <Text style={styles.btnText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const sections = {
  order: (props) => <SectionView {...props} />,
  orientation: (props) => <SectionView {...props} />,
  type: (props) => <SectionView {...props} />,
  colors: (props) => <ColorsView {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );

    return { opacity };
  });
  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  overlay: {
    backgroundColor: theme.colors.neutral(0.2),
  },
  content: {
    padding: theme.verticalsizes.md14,
    gap: theme.verticalsizes.md14,
    // backgroundColor: "red",
  },
  filterText: {
    fontFamily: theme.fonts.Poppins600,
    fontSize: theme.fontsize.xl18,
    color: theme.colors.neutral(0.8),
  },
  bottomBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.sizes.sm12,
    position: "absolute",
    bottom: 0,
    left: theme.sizes.md14,
    right: theme.sizes.md14,
  },
  btnContainer: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    paddingVertical: theme.verticalsizes.md14,
    borderRadius: theme.sizes.md14,
    borderCurve: "continuous",
  },
  btnText: {
    fontFamily: theme.fonts.Poppins600,
    fontSize: theme.fontsize.lg16,
    color: theme.colors.white,
    textAlign: "center",
  },
});
