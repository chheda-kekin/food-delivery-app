import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const CartButton = () => {

    // const totalItems = 10;
    const { getTotalItems } = useCartStore();

    const totalItems = getTotalItems();

    return (
        <>
            <Pressable className="cart-btn" onPress={() => router.push("/cart")} android_ripple={{color: "#ffffff"}}>
                <Image source={images.bag} resizeMode="contain" className="size-5" />
                { totalItems > 0 &&  (<View className="cart-badge">
                    <Text className="text-xs text-white">{totalItems}</Text>
                </View>) }
            </Pressable>
        </>
    );
}

export default CartButton;