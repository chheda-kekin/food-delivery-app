import { useCartStore } from "@/store/cart.store";
import React from "react";
import { Image, Pressable, Text } from "react-native";


const fetchImage = async (url: string) => {
  const response = await fetch(url);
  const imageBlob = await response.blob();

  return URL.createObjectURL(imageBlob);
};

const MenuCard: React.FC<any> = ({ name, index, imageUrl, price, id }) => {

  const { addItem } = useCartStore();

  return (
      <Pressable className="menu-card" style={{  shadowColor: "#000000", shadowOpacity: 0.5, shadowOffset: {width: 0, height: 4}, shadowRadius: 4, elevation: 4 }}>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            className="size-32 absolute -top-10"
            resizeMode="contain"
          />
        )}
        <Text className="text-center text-dark-100 font-bold mb-2" 
          numberOfLines={1}>{ name }</Text>
        <Text className="text-gray-200 body-regular mb-4">From {price} INR</Text>
        <Pressable onPress={() => addItem({id, name, price, image_url: imageUrl, customizations: []})}>
          <Text className="text-primary paragraph-bold font-bold">Add to Cart +</Text>
        </Pressable>  
      </Pressable>
  );
};

export default MenuCard;
