import { SplashScreen, Stack } from "expo-router";

// import * as Sentry from '@sentry/react-native';
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "./globals.css";

import useAuthStore from "@/store/auth.store";

// Sentry.init({
//   dsn: 'https://0e61296eb8e899763678115db42d541d@o4509820238430208.ingest.us.sentry.io/4509820239609856',

//   // Adds more context data to events (IP address, cookies, user, etc.)
//   // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
//   sendDefaultPii: true,

//   // Configure Session Replay
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1,
//   integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

//   // uncomment the line below to enable Spotlight (https://spotlightjs.com)
//   // spotlight: __DEV__,
// });

export default function RootLayout() {

  const {isLoading, fetchAuthenticatedUser} = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf")
  });

  useEffect(() => {
    if(error) {
      throw error;
    }
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [])

  if(! fontsLoaded || isLoading) {
    return null;
  }

  return <Stack screenOptions={{headerShown: false}} />;
};