import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";

import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {

    const params = useLocalSearchParams<{query?: string}>();
    const [query, setQuery] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text: string) => {
        // router.setParams({query: text})
        router.push(`/search?query=${text}`);
    }, 500);

    const handleSearch = (text: string) => {
        setQuery(text);
        // debouncedSearch(text);

        if(! text) {
            router.setParams({ query: undefined})
        }
    }

    const handleSubmit = () => {
        if(query?.trim()) {
            router.setParams({query})
        }
    }
    
    return (
        <View className="searchbar">
            <TextInput  
                className="flex-1 p-5"
                placeholder="Search for your favorite food item" 
                value={query} 
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                returnKeyType="search"
                placeholderTextColor="#A0A0A0" />
            <Pressable className="pr-5" onPress={() => router.setParams({ query })}>
                <Image source={images.search} 
                    resizeMode="contain" 
                    className="size-6"
                    tintColor="#5D5F6D" />
            </Pressable>    
        </View>
    )
}

export default SearchBar;