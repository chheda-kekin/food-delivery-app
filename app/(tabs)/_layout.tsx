import { Redirect, Slot } from "expo-router";



const _Layout = () => {

    const isAuthenticated = true;

    if(! isAuthenticated) {
        <Redirect href="/sign-in" />
    }

    return (
        <Slot />
    )
}

export default _Layout;