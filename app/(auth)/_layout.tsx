import { images } from "@/constants";
import { Slot } from "expo-router";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const screenHeight = Dimensions.get("screen").height;

const _Layout = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding": "height"}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="relative w-full" style={{ height: screenHeight/2.25 }}>
                    <ImageBackground source={images.loginGraphic} resizeMode="stretch" className="size-full rounded-b-lg" />
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16  z-10" />
                </View>
            </ScrollView>
            <Slot />
        </KeyboardAvoidingView>
    )
}

export default _Layout;