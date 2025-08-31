import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, Pressable, Text } from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {

    const searchParams = useLocalSearchParams();

    const [active, setActive] = useState(searchParams.category || "");

    const handlePress = (id: string) => {

        console.log('Set category', id);
        setActive(id);

        if(id === 'all') {
            router.setParams({category: undefined});
        } else {
            router.setParams({category: id});
        }
    }

    const filterData: (Category | {$id: string, name: string})[] = categories ? [ {$id: 'all', name: "All"}, ...categories]: [{$id: 'all', name: "All"}]

    return (
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-x-2 pb-3" 
            data={filterData}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
                <Pressable className={cn("filter", active === item.$id? 'bg-amber-500':'bg-white')}
                style={Platform.OS === "android" ? {  shadowColor: "#878787", elevation: 5 }: {}}
                onPress={() => handlePress(item.$id)}>
                    <Text className={cn("text-sm font-semibold", active === item.$id ? "text-white": "text-dark-100")}>{ item.name }</Text>
                </Pressable>
            )} />
    );
}

export default Filter;