import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../utils/Theme";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function FilterModal({ modalRef }) {
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
          <Text>Section</Text>
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

const sections = {
  order: (props) => <SectionView {...props} />,
  orientation: (props) => <SectionView {...props} />,
  type: (props) => <SectionView {...props} />,
  colors: (props) => <SectionView {...props} />,
};

const SectionView = () => {
  return (
    <View>
      <Text>Section View</Text>
    </View>
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
    fontFamily: theme.fonts.Poppins500,
    fontSize: theme.fontsize.xl18,
    color: theme.colors.neutral(0.8),
  },
});
