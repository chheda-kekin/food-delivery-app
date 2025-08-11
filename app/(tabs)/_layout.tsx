import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";



const TabLayout = () => {

    const { isAuthenticated } = useAuthStore();

    // const isAuthenticated = true;

    if(! isAuthenticated) {
        <Redirect href="/sign-in" />
    }

    return (
        <Slot />
    )
}

export default TabLayout;