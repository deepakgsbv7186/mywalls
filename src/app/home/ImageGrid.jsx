import { MasonryFlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { getColoumnNumber, getImageSize } from "../../utils/common";
import { theme } from "../../utils/Theme";
import { useRouter } from "expo-router";

export default function ImageGrid({ images }) {
  const router = useRouter();
  return (
    <MasonryFlashList
      data={images}
      numColumns={getColoumnNumber()}
      renderItem={({ item, index }) => (
        <ImageCard item={item} index={index} router={router} />
      )}
      estimatedItemSize={300}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const ImageCard = ({ item: image, index, router }) => {
  const getImageHeight = () => {
    let { imageWidth: width, imageHeight: height } = image;
    return { height: getImageSize(width, height) };
  };
  return (
    <Pressable
      style={styles.imageWrapper}
      onPress={() =>
        router.push({ pathname: "home/image", params: { ...image } })
      }
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={{ uri: image?.webformatURL }}
        contentFit="cover"
        transition={400}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    borderRadius: theme.sizes.md14,
    borderCurve: "continuous",
    overflow: "hidden",
    backgroundColor: theme.colors.grayBG,
    margin: theme.sizes.sm12 / 2,
  },
  image: {
    width: "100%",
    height: 300,
  },
  contentContainerStyle: {
    paddingHorizontal: theme.sizes.sm12 / 3,
    paddingBottom: theme.sizes.lg16,
  },
});
