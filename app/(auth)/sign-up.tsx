import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const submit = async () => {

        const { name, email, password } = form;

        if(! email || ! password || ! name) {
            return Alert.alert("Error", "Please enter details");
        } else {
            setIsSubmitting(true);
            try {
                await createUser({name, email, password});
                router.replace("/");
            } catch(error: any) {
                Alert.alert("Error", error.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            {/* <Button title="Sign up" onPress={()=> router.push("/sign-up")} /> */}
            <CustomInput placeholder="Enter your name" 
                    label="Name"
                    value={form.name}
                    onChangeText={(text) => {
                        setForm((prevState) => {
                            return {
                                ...prevState,
                                name: text
                            }
                        })
                    }} 
                    keyboardType="default" />
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
                title="Sign Up"
                isLoading={isSubmitting}
                onPress={submit}  />
        </View>
    );
}

export default SignUp;