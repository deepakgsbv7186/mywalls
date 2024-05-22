import { Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { ensureDirExists, toastConfig } from "../../utils/common";
import { theme } from "../../utils/Theme";

export default function ImageScreen() {
  const router = useRouter();
  const image = useLocalSearchParams();
  const [status, setStatus] = useState("loading");
  const fileName = image?.previewURL?.split("/").pop();
  const imageUrl = image?.webformatURL;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  const getSize = () => {
    const aspectRatio = image?.imageWidth / image?.imageHeight;

    const maxWidth =
      Platform.OS === "web" ? theme.width * 0.3 : theme.width * 0.9;

    let calculatedWidth = maxWidth;
    let calculatedHeight = maxWidth / aspectRatio;

    // portrait
    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const handleDownloadWallpaper = async () => {
    setStatus("downloading");
    const URL = await downloadWallpaper();
    if (Platform.OS === "web") {
      const anchor = document.createElement("a");
      anchor.href = imageUrl;
      anchor.target = "_blank";
      anchor.download = fileName || "mywall-download";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      if (URL) {
        setStatus("");
        Toast.show({
          type: "success",
          text1: "Image Downloaded",
        });
      }
    }
  };
  const handleShareWallpaper = async () => {
    setStatus("sharing");
    const URL = await downloadWallpaper();
    if (Platform.OS === "web") {
      Toast.show({ text1: "Link Copied" });
    } else {
      await Sharing.shareAsync(URL);
    }
  };

  const downloadWallpaper = async () => {
    try {
      await ensureDirExists();
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      return uri;
    } catch (error) {
      console.log("download error", error.message);
      return null;
    } finally {
      setStatus("");
    }
  };
  return (
    <BlurView
      tint="dark"
      intensity={Platform.OS === "web" ? 30 : 10}
      // experimentalBlurMethod="dimezisBlurView"
      style={styles.container}
    >
      <View style={[styles.imgStyle, getSize()]}>
        <View style={styles.loading}>
          {status === "loading" && (
            <ActivityIndicator
              size={"large"}
              color={theme.colors.neutral(0.6)}
            />
          )}
        </View>
        <Image
          transition={100}
          style={[styles.imgStyle, getSize()]}
          source={{ uri: image?.webformatURL }}
          onLoad={() => setStatus("")}
        />
      </View>
      <View style={styles.btnContainer}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable onPress={() => router.back()} style={styles.buttons}>
            <Octicons name="x" size={24} color={theme.colors.white} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify()}>
          {status === "downloading" ? (
            <View style={styles.buttons}>
              <ActivityIndicator size={24} color={theme.colors.white} />
            </View>
          ) : (
            <Pressable onPress={handleDownloadWallpaper} style={styles.buttons}>
              <Octicons name="download" size={24} color={theme.colors.white} />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify()}>
          {status === "sharing" ? (
            <View style={styles.buttons}>
              <ActivityIndicator size={24} color={theme.colors.white} />
            </View>
          ) : (
            <Pressable onPress={handleShareWallpaper} style={styles.buttons}>
              <Octicons name="share" size={24} color={theme.colors.white} />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast config={toastConfig} />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.sizes.md14,
  },
  imgStyle: {
    borderRadius: theme.sizes.md14,
    borderCurve: "continuous",
    borderColor: theme.colors.neutral(0.1),
    borderWidth: 1,
    overflow: "hidden",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: Platform.OS === "web" ? "column-reverse" : "row",
    alignItems: Platform.OS === "web" ? "flex-end" : "center",
    justifyContent: "space-between",
    gap: theme.sizes.md14 * 2,
    position: "absolute",
    bottom: theme.sizes.md14 * 2,
    left: theme.sizes.md14 * 2,
    right: theme.sizes.md14 * 2,
  },
  buttons: {
    borderRadius: theme.sizes.md14,
    borderCurve: "continuous",
    paddingHorizontal: theme.sizes.xxl20,
    paddingVertical: theme.sizes.md14,
    backgroundColor:
      Platform.OS === "web"
        ? "rgba(255,255,255, 0.5)"
        : "rgba(255,255,255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
