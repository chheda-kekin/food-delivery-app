import { router } from "expo-router";
import { Button, Text, View } from "react-native";


const SignIn = () => {
    return (
        <View>
            <Button title="Sign up" onPress={()=> router.push("/sign-up")} />
            <Text>Sign In Screen</Text>
        </View>
    );
}

export default SignIn; 