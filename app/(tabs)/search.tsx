import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import { getAllCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppWrite";

import { Category } from "@/type";

// Filter

// SearchBar



const Search = () => {

  const { category, query } = useLocalSearchParams<{query: string, category: string}>();

  console.log("Category", category);
  console.log("Query", query);

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6,
    },
  });

  const { data: categories } = useAppwrite({
    fn: getAllCategories,
    params: {}
  });

  useEffect(() => {
    refetch({category, query, limit: 6})        
  }, 
  [category, query])

//   console.log(data);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList data={data} 
        renderItem={({item, index}) => {
          
            const isEvenItem = index % 2 > 0;

            return (
            <View className={cn("flex-1 max-w-[48%]", isEvenItem ? "mt-10" : "mt-0")}>  
                <MenuCard name={item.name} 
                            index={index}
                            price={item.price} 
                            imageUrl={item.image_url}  />
            </View>)
        }}
        keyExtractor={(item) => {
            return item.$id
        }}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (<View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
                <View className="flex-start">
                    <Text className="text-primary text-sm uppercase font-bold">search</Text>
                    <View className="flex-row gap-2 mt-0.5  items-center">
                        <Text className="font-bold text-dark-100">Find your Favorite Food</Text>
                        <Image source={images.arrowDown} resizeMode="contain" className="size-3" />
                    </View>
                </View>
                <CartButton />
            </View>
            <SearchBar />
            <Filter categories={categories as Category[]} />
        </View>)}  
        ListEmptyComponent={()=> !loading && <Text>No Results!</Text>}/>
      <Text>Search</Text>
    </SafeAreaView>
  );
};

export default Search;
