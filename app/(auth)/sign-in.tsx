import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const submit = async () => {

        const { email, password } = form;
        
        setIsSubmitting(true);
        if(! email || ! password) {
            return Alert.alert("Error", "Please enter email & password.")
        } else {
            try {
                await signIn({email, password});
                router.replace("/");
                // Alert.alert("Success", "User signed in successfully!");
            } catch(error: any) {
                return Alert.alert("Error", error.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            {/* <Button title="Sign up" onPress={()=> router.push("/sign-up")} /> */}
            <CustomInput placeholder="Enter your email" 
                    label="Email address"
                    value={form.email}
                    onChangeText={(text) => {
                        setForm((prevState) => {
                            return {
                                ...prevState,
                                email: text
                            }
                        })
                    }} 
                    keyboardType="email-address" />
            <CustomInput placeholder="Enter password" 
                    label="Password"
                    value={form.password}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setForm((prevState) => {
                            return {
                                ...prevState,
                                password: text 
                            }
                        })
                    }} 
                    keyboardType="default" />
             <CustomButton 
                title="Sign In"
                isLoading={isSubmitting}
                onPress={submit}  />
             <View className="flex-row justify-center gap-2 mt-5">
                <Text className="base-regular text-gray-100">
                    Don't have an account?
                </Text>
                <Link href="/sign-up" className="base-bold text-primary">Sign up</Link>
            </View>       
        </View>
    );
}

export default SignIn; 