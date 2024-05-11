import { moderateScale } from "./Responsive";

export const theme = {
  colors: {
    white: "#fff",
    black: "#000",
    grayBG: "#e5e5e5",
    neutral: (opacity) => `rgba(10,10,10,${opacity})`,
  },

  fontWeights: {
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  sizes: {
    xs: moderateScale(10),
    sm: moderateScale(12),
    md: moderateScale(14),
    lg: moderateScale(16),
    xl: moderateScale(18),
  },
};
