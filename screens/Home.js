import React from "react";
import {StyleSheet,Text, View, SafeAreaView, FlatList,TouchableOpacity,Image,TextInput} from "react-native";
import { CategoryCard, TrendingCard } from "../components"
import { useNavigation } from "@react-navigation/native";
import { SIZES } from "../screens/constants";


const Home = () =>{
const navigation = useNavigation();
    function renderHeader(){
        return(
            <View
            style={{
                flexDirection: "row",
                marginHorizontal: SIZES.padding,
                alignItems: "center",
                height: 80,
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: "darkGreen",
              
                  }}>
                     Cześć Justyna
                </Text>
                <Text
                  style={{
                    marginTop: 3,
                    color: "gray",
                  
            }}
          >
            Co dziś ugotujemy?
            </Text>
          </View>
          <TouchableOpacity>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
         </View>
        )
    };
    function renderSearchBar() {
      return (
        <View
          style={{
            flexDirection: "row",
            height: 50,
            alignItems: "center",
            marginHorizontal: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            borderRadius: 10,
            backgroundColor: "lightGray",
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor:"gray",
            }}
          />
          <TextInput
            style={{
              marginLeft: SIZES.radius,
              
              flex: 1,
            }}
            placeholder="Szukaj przepisu"
            placeholderTextColor={"gray"}
          />
        </View>
      );
    };
    function renderSeeRecipeCard() {
      return (
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            borderRadius: 10,
            backgroundColor: "lightGreen",
          }}
        >
          <View
            style={{
              width: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: SIZES.radius,
            }}
          >
            <Text
              style={{
                width: "70%",
                
              }}
            >
              Masz 12 przepisów, których jeszcze nie wypróbowałeś.
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 10,
              }}
              onPress={() => console.log("See recipes")}
            >
              <Text
                style={{
                  color: "darkGreen",
                  textDecorationLine: "underline",
                  
                }}
              >
                Zobacz przepisy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    function renderTrendingSection() {
      return (
        <View
          style={{
            marginTop: SIZES.padding,
          }}
        >
          <Text
            style={{
              marginHorizontal: SIZES.padding,
              
            }}
          >
            Trending Recipe
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item, index }) => {
              return (
                <TrendingCard
                key={index}
                recipeItem={item}
                containerStyle={{
                  marginLeft: index === 0 ? SIZES.padding : 0,
                }}
                onPress={() => navigation.navigate("Recipe", { recipe: item })}
              />
              );
            }}
          />
        </View>
      );
    }
    function renderCategoryHeader() {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginHorizontal: SIZES.padding,
          }}
        >
          <Text
            style={{
              flex: 1,
              
            }}
          >
            Categories
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: "gray",
                
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  
  
    return(
        <SafeAreaView
        style={{
            flex:1,
            backgroundColor:"white",
        }}>
            <FlatList
            keyExtractor={(item) => item.id.toString()}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
            <View>
                {renderHeader()}
                {renderSearchBar()}
                {renderSeeRecipeCard()}
                {renderTrendingSection()}
                {renderCategoryHeader()}
            </View>
            }
            renderItem={({ item }) => {
              return (
                <CategoryCard
                  categoryItem={item}
                  containerStyle={{
                    marginHorizontal: SIZES.padding,
                  }}
                  onPress={() => navigation.navigate("Recipe", { recipe: item })}
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: 100,
                }}
              />
            }
          />
        </SafeAreaView>
      );
    };
export default Home

const styles = StyleSheet.create({})