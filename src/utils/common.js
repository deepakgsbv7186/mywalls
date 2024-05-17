import { theme } from "./Theme";

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
