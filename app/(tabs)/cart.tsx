import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PaymentInfoStripeProps } from "@/type";


import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import cn from "clsx";

const PaymentInfoStripe = ({label, value, labelStyle, valueStyle}: PaymentInfoStripeProps) => {
    return (
        <View className="flex-row flex-between my-1">
            <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>{label}</Text>
            <Text className={cn("paragraph-bold text-gray-100", valueStyle)}>{value}</Text>
        </View>
    )
}


const Cart = () => {

    const { items, getTotalItems, getTotalPrice } = useCartStore();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={items}
                renderItem={({item}) => (<CartItem item={item} />)}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={()=> <CustomHeader title="Your Cart"/>}
                ListEmptyComponent={() => <Text>Cart Empty</Text>}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                        <Text className="h3-bold text-dark-100 mb-5">
                            Payment Summary
                        </Text>
                        <PaymentInfoStripe label={`Total Items ${totalItems}`} value={`${totalPrice.toFixed(2)}`} />
                        <PaymentInfoStripe label={`Delivery Charges`} value={`50 INR`} />
                        <PaymentInfoStripe label={`Discount`} value={`65 INR`} valueStyle="!text-success" />
                        <View className="border-t border-gray-300 my-2">
                            <PaymentInfoStripe
                                label={`Total`}
                                labelStyle="base-bold !text-dark-100"
                                value={`${(totalPrice + 50 - 65).toFixed(2)} INR`}
                                valueStyle="!text-dark-100 base-bold !text-right"
                                 />
                        </View>
                        <CustomButton title="Order Now" />
                    </View>
                )}
             />
        </SafeAreaView>
    )
}

export default Cart;