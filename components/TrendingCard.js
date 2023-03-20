import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

import { SIZES, COLORS, FONTS } from "../screens/constants";
import {useEffect } from "react";


const RecipeCardDetails = ({ recipeItem }) => {

  useEffect(()=>{
    console.log(recipeItem)
  })
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            width: "70%",
            color: "white",
            ...FONTS.h3,
            fontSize: 18,
          }}
        >
          {recipeItem.title}
        </Text>
        <Image
         source={{uri:recipeItem.image}}
          style={{
            width: 20,
            height: 20,
            marginRight: SIZES.base,
            tintColor: "green",
          }}
        />
      </View>

      <Text
        style={{
          color: "gray",
          ...FONTS.body4,
        }}
      >
        {recipeItem.readyInMinutes} | {recipeItem.servings} Serving
      </Text>
    </View>
  );
};

const RecipeCardInfo = ({ recipeItem }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView
        blurType="dark"
        overlayColor=""
        blurAmount={10}
        style={styles.recipeCardContainer}
      >
        <RecipeCardDetails recipeItem={recipeItem} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          ...styles.recipeCardContainer,
          backgroundColor:"gray",
        }}
      >
        <RecipeCardDetails recipeItem={recipeItem} />
      </View>
    );
  }
};

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 350,
        width: 250,
        marginTop: SIZES.radius,
        marginRight: 20,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={{uri:recipeItem.image}}
        resizeMode="cover"
        style={{
          width: 250,
          height: 350,
          borderRadius: SIZES.radius,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 15,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 5,
          backgroundColor: "gray",
          borderRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            color:"white",
            ...FONTS.h4,
          }}
        >
          {recipeItem.dishTypes[0]}
        </Text>
      </View>

      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({
  recipeCardContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
});
