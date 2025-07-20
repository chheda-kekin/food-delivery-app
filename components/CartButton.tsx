import { images } from "@/constants";
import { Image, Pressable, Text, View } from "react-native";

const CartButton = () => {

    const totalItems = 10;

    return (
        <>
            <Pressable className="cart-btn" onPress={() => {}} android_ripple={{color: "#ffffff"}}>
                <Image source={images.bag} resizeMode="contain" className="size-5" />
                { totalItems > 0 &&  (<View className="cart-badge">
                    <Text className="text-xs text-white">{totalItems}</Text>
                </View>) }
            </Pressable>
        </>
    );
}

export default CartButton;