import seed from "@/lib/seed";
import { Button } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";


const Cart = () => {
    return (
        <SafeAreaView>
            {/* <Text>Cart</Text> */}
            <Button title="Seed" onPress={() => {return seed().catch(e => {
                console.error(e);
                throw e;
            })}} />
        </SafeAreaView>
    )
}

export default Cart;