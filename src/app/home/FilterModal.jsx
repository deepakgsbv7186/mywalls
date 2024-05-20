import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import SectionView from "../../components/SectionView";
import filterList from "../../constants/filterList";
import { theme } from "../../utils/Theme";

export default function FilterModal({ modalRef, setFilters, filters }) {
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
          {Object.entries(filterList).map(([title, data]) => (
            <SectionView
              data={data}
              title={title}
              key={title}
              setFilters={setFilters}
              filters={filters}
            />
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

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
    // backgroundColor: "coral",
  },
  overlay: {
    backgroundColor: theme.colors.neutral(0.2),
  },
  content: {
    padding: theme.verticalsizes.md14,
    gap: theme.verticalsizes.md14,
  },
  filterText: {
    fontFamily: theme.fonts.Poppins600,
    fontSize: theme.fontsize.xl18,
    color: theme.colors.neutral(0.8),
  },
});
