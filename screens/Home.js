import React from "react";
import {StyleSheet,Text, View, SafeAreaView, FlatList,TouchableOpacity,Image,TextInput} from "react-native";
import { CategoryCard, TrendingCard } from "../components"
import { useNavigation } from "@react-navigation/native";
import { SIZES,FONTS,COLORS } from "../screens/constants";
import axios from "axios";
import { useState,useEffect } from "react";
import Autocomplete from 'react-autocomplete'
import { ImageBackground } from 'react-native';

const Home = () =>{

  const [data,setData]= useState([]);
  const getData= ()=> {
    axios.get("https://api.spoonacular.com/recipes/random?number=10&apiKey=c0bc41e997cc4c38912e4671df4527ce").then((response)=>{setData(response.data)
    console.log(response)
    })
  }
  useEffect(()=>{
    getData();
    getData2();
    setReady(true)
  },[])

  const [data2,setData2]= useState([]);
  const getData2= ()=> {
    axios.get("https://api.spoonacular.com/recipes/random?number=5&apiKey=c0bc41e997cc4c38912e4671df4527ce").then((response)=>{setData2(response.data)
    console.log(response)}
    )
  }
  const [isReady,setReady]= useState(false);

  const getData3= (query)=> {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=c0bc41e997cc4c38912e4671df4527ce&query=${query}`).then((response)=>{setData3(response.data)
    console.log(response)
    })}
    const [data3,setData3]= useState([]);

  const navigation = useNavigation();
    
  function renderHeader() {
    return (
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/4673/4673886.png",
              }}
              style={styles.headerImage}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerGreetingText}>HI JUSTYNA !</Text>
            <Text style={styles.headerQuestionText}>HOW COOK TODAY?</Text>
          </View>
        </View>
      );
    }
    
    function renderSearchBar() {
      return (
        /*
    <Autocomplete
      data={data3}
      value= {""}
      onChangeText={(text) =>getData3(text)}
      flatListProps={{
        keyExtractor: (_, idx) => idx,
        renderItem: ({ item }) => <Text>{item.name}</Text>,
      }}
    />
    */
        <Text
            style={{
              marginTop: 5,
              color: "white",
              textAlign: "center",
              fontSize: 10,
            }}
          >
            Tu będzie wyszukiwarka
          </Text>
  )
};
function renderSeeRecipeCard() {
  return (
    <View style={styles.seeRecipeContainer}>
      <View style={styles.seeRecipeImageContainer}>
        <Image style={styles.seeRecipeImage} />
      </View>
    </View>
  );
}
function renderTrendingSection() {
  return (
    <View style={styles.trendingSectionContainer}>
      <Text style={styles.trendingSectionTitle}>
        Top Przepisy na dziś
      </Text>
      <FlatList
        data={data.recipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <TrendingCard
              key={index}
              recipeItem={item}
              containerStyle={[
                styles.trendingCardContainer,
                { marginLeft: index === 0 ? SIZES.padding : 0 },
              ]}
              onPress={() => navigation.navigate("Recipe", { id: item.id })}
            />
          );
        }}
      />
    </View>
  );
}

function renderCategoryHeader() {
  return (
    <View style={styles.categoryHeaderContainer}>
      <Text style={styles.categoryHeaderText}>Kategorie</Text>
      <TouchableOpacity>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
    </View>
  );
}
return (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={data2.recipes}
      keyExtractor={(item) => item.id.toString()}
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          {isReady && (
            <>
              {renderHeader()}
              {renderSearchBar()}
              {renderSeeRecipeCard()}
              {renderTrendingSection()}
              {renderCategoryHeader()}
            </>
          )}
        </View>
      }
      renderItem={({ item }) => {
        return (
          <CategoryCard
            categoryItem={item}
            containerStyle={styles.categoryCardContainer}
            onPress={() =>
              navigation.navigate("Recipe", { recipe: item })
            }
          />
        );
      }}
      ListFooterComponent={
        <View style={styles.footer} />
      }
    />
  </SafeAreaView>
);
};
export default Home

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginHorizontal: SIZES.padding,
    alignItems: "center",
    height: 100,
    backgroundColor: "black",
    justifyContent: "center",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerGreetingText: {
    color: "orange",
    textAlign: "center",
    fontSize: 24,
  },
  headerQuestionText: {
    marginTop: 5,
    color: "gray",
    textAlign: "center",
    fontSize: 18,
  },
  headerImage: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  seeRecipeContainer: {
    flexDirection: "row",
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: 10,
    backgroundColor: "lightGreen",
  },
  seeRecipeImageContainer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  seeRecipeImage: {
    // specify image styles here
  },
  trendingSectionContainer: {
    marginTop: 10,
  },
  trendingSectionTitle: {
    marginHorizontal: SIZES.padding,
    textAlign: "center",
    fontSize: 20,
    color: "orange",
  },
  trendingCardContainer: {
    marginLeft: SIZES.padding,
  },
  categoryHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: SIZES.padding,
  },
  categoryHeaderText: {
    flex: 1,
  },
  viewAllText: {
    color: "gray",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  categoryHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: SIZES.padding,
  },
  categoryHeaderText: {
    flex: 1,
    ...FONTS.h2,
  },
  categoryHeaderLink: {
    color: COLORS.gray,
    ...FONTS.body3,
  },
  categoryCardContainer: {
    marginHorizontal: SIZES.padding,
  },
  footer: {
    marginBottom: 100,
  },
});
