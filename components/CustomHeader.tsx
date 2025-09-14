import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import { images } from "@/constants";
import { CustomHeaderProps } from "@/type";

const CustomHeader = ({ title }: CustomHeaderProps) => {
    const router = useRouter();

    return (
        <View className="custom-header">
            <Pressable className="mr-5" onPress={() => router.back()}>
                <Image
                    source={images.arrowBack}
                    className="size-5"
                    resizeMode="contain"
                />
            </Pressable>
            <View className=" flex-row justify-center">
                {title && <Text className="text-base font-bold text-dark-100">{title}</Text>}
            </View>

            {/* <Image source={images.search} className="size-5" resizeMode="contain" /> */}
        </View>
    );
};

export default CustomHeader;
