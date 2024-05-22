import { StyleSheet, Text, View } from "react-native";
import { theme } from "./Theme";
import * as FileSystem from "expo-file-system";

export const getColoumnNumber = () => {
  if (theme.width >= 1024) {
    return 4;
  } else if (theme.width >= 768) {
    return 3;
  } else {
    return 2;
  }
};

export const getImageSize = (width, height) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    // portrait
    return 300;
  } else {
    // square
    return 200;
  }
};

// Checks if gif directory exists. If not, creates it
const mywalls = FileSystem.cacheDirectory + "mywalls/";
export async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(mywalls);
  if (!dirInfo.exists) {
    console.log("Mywalls directory doesn't exist, creating…");
    await FileSystem.makeDirectoryAsync(mywalls, { intermediates: true });
  }
}

export const toastConfig = {
  success: ({ text1, ...props }) => (
    <View style={styles.successToast}>
      <Text style={styles.successText}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  successToast: {
    paddingVertical: theme.sizes.sm12,
    paddingHorizontal: theme.sizes.md14,
    borderRadius: theme.sizes.md14,
    borderCurve: "continuous",
    backgroundColor: "rgba(255,255,255, 0.3)",
  },
  successText: {
    fontFamily: theme.fonts.Poppins500,
    fontSize: theme.fontsize.xxl20,
    color: theme.colors.white,
  },
});
