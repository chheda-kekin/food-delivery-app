import cn from "clsx";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";




export default function Index() {

  const { user } = useAuthStore();

  function renderOffer(listItem: any) {

    const isEven = listItem.index % 2 === 0;

    return (<View>
      <Pressable className={cn("offer-card", isEven ? "flex-row-reverse": "flex-row")} 
          style={{backgroundColor: listItem.item.color}}
          android_ripple={{color: "#fffff22"}}>
        {
          ({pressed}) => (
            <Fragment>
              <View className={"h-full w-1/2"}>
                <Image source={listItem.item.image} className="size-full" resizeMode="contain"/>
              </View>
              <View className={cn("offer-card__info", isEven? "pl-2": "pr-2")}>
                <Text className="leading-tight text-4xl font-bold text-white">
                  {listItem.item.title}
                </Text>
                <Image source={images.arrowRight} className="size-10" resizeMode="contain" tintColor={"#ffffff"} />
              </View>
            </Fragment>
          )
        }
      </Pressable>
    </View>)
  }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList  data={offers} renderItem={renderOffer}  contentContainerClassName="pb-28 px-5"
      ListHeaderComponent={()=>(
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="text-sm font-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-row items-center gap-2">
                <Text className="font-bold text-dark-100">Ramnagar, Dombivali</Text>
                <Image source={images.arrowDown} resizeMode="contain" className="size-3"/>
              </TouchableOpacity>
            </View>
            <CartButton />
        </View>  
      )} />      
    </SafeAreaView>
  );
}
