import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const SignUp = () => {
    return (
        <View>
            <Button title="Sign In"  onPress={() => router.push("/sign-in")} />
            <Text>Sign Up Screen!</Text>
        </View>
    )
}

export default SignUp;