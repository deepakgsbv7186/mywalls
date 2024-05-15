import { Dimensions, StatusBar } from "react-native";
import { moderateScale, moderateScaleVertical, textScale } from "./Responsive";
const { width, height } = Dimensions.get("window");

export const theme = {
  colors: {
    white: "#fff",
    black: "#000",
    grayBG: "#e5e5e5",
    neutral: (opacity) => `rgba(10,10,10,${opacity})`,
  },
  sizes: {
    xs10: moderateScale(10),
    sm12: moderateScale(12),
    md14: moderateScale(14),
    lg16: moderateScale(16),
    xl18: moderateScale(18),
    xxl20: moderateScale(20),
  },
  verticalsizes: {
    xs10: moderateScaleVertical(10),
    sm12: moderateScaleVertical(12),
    md14: moderateScaleVertical(14),
    lg16: moderateScaleVertical(16),
    xl18: moderateScaleVertical(18),
    xxl20: moderateScaleVertical(20),
  },
  fonts: {
    SpaceRegular: "SpaceMono-Regular",
    Poppins900: "Poppins-Black",
    Poppins800: "Poppins-ExtraBold",
    Poppins700: "Poppins-Bold",
    Poppins600: "Poppins-SemiBold",
    Poppins500: "Poppins-Medium",
    Poppins400: "Poppins-Regular",
    Poppins300: "Poppins-Light",
    Poppins200: "Poppins-ExtraLight",
  },
  fontsize: {
    xs10: textScale(10),
    sm12: textScale(12),
    md14: textScale(14),
    lg16: textScale(16),
    xl18: textScale(18),
    xxl20: textScale(20),
  },
  width: width,
  height: height,
  statusbarSize: StatusBar.currentHeight,
};
