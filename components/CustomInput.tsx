import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import cn from "clsx";

import { CustomInputProps } from "@/type";

const CustomInput = ({
  placeholder = "Enter Text",
  value,
  label,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
}: CustomInputProps) => {

    const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      <View className="h-[57px] w-full">
        <View className="h-5">
            <Text className="text-gray-100 
                text-base font-medium">{label}</Text>
        </View>
        {/* <View className="h-[27px] gap-1"> */}
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                className={cn("input", isFocus ? "border-primary": "border-gray-300")}
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)}
        />
        {/* </View> */}
      </View>
    </>
  );
};

export default CustomInput;
