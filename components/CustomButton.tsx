import { ActivityIndicator, Pressable, Text, View } from "react-native";

import cn from "clsx";

import { CustomButtonProps } from "@/type";

const CustomButton = ({
    title = "Click Me",
    onPress,
    style,
    textStyle,
    leftIcon,
    isLoading,

}: CustomButtonProps) => {
    return (
        <Pressable className={cn("custom-btn", style)} onPress={onPress}>
            <View className="flex-center flex-row">
                {leftIcon}
                { isLoading ? <ActivityIndicator  size="small" color="white"  /> : 
                <Text className={cn("text-white-100", "font-semibold",textStyle)}>{title}</Text>}
            </View>
        </Pressable>
    )
}

export default CustomButton;