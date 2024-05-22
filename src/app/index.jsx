import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { imgpath } from "../assets/images";
import { theme } from "../utils/Theme";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function Welcome() {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
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
            Wallpaper That Matters To You
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
      <Toast />
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
    gap: theme.sizes.lg16,
  },
  title: {
    fontFamily: theme.fonts.Poppins600,
    fontSize: theme.fontsize.xs10 * 4,
    color: theme.colors.black,
  },
  punchLine: {
    fontFamily: theme.fonts.Poppins400,
    fontSize: theme.fontsize.sm12 * 1.5,
    color: theme.colors.neutral(0.9),
  },
  btnStyle: {
    marginBottom: theme.verticalsizes.xs10 * 5,
    backgroundColor: theme.colors.neutral(0.9),
    padding: theme.sizes.md14,
    minWidth: theme.width * 0.8,
    borderRadius: theme.sizes.sm12,
    borderCurve: "continuous",
  },
  btnText: {
    fontFamily: theme.fonts.Poppins500,
    textAlign: "center",
    fontSize: theme.fontsize.xl18,
    color: theme.colors.white,
    letterSpacing: 2,
  },
});
