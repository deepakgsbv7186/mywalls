import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../utils/Theme";
import { imgpath } from "../assets/images";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "../utils/Responsive";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={imgpath.welcome}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <Animated.View style={{ flex: 1 }} entering={FadeInDown.duration(600)}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />

        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            My Walls
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            style={styles.punchLine}
          >
            Wallpaper That Matters To Me
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable
              onPress={() => router.replace("/home")}
              style={styles.btnStyle}
            >
              <Text style={styles.btnText}>Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.2),
  },
  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "65%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: theme.sizes.lg,
  },
  title: {
    fontSize: textScale(50),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.black,
  },
  punchLine: {
    fontSize: textScale(24),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  btnStyle: {
    marginBottom: moderateScaleVertical(50),
    backgroundColor: theme.colors.neutral(0.9),
    padding: moderateScale(14),
    minWidth: width * 0.8,
    borderRadius: theme.sizes.sm,
    borderCurve: "continuous",
  },
  btnText: {
    textAlign: "center",
    fontSize: textScale(18),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    letterSpacing: 2,
  },
});
