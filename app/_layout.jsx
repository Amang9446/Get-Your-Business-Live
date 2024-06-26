import {Stack} from "expo-router";
import {useFonts} from "expo-font";
import {ClerkProvider, SignedIn, SignedOut} from "@clerk/clerk-expo";
import LoginScreen from "../components/LoginScreen";
import * as SecureStore from "expo-secure-store";
import {StatusBar} from 'expo-status-bar';

const tokenCache = {
    async getToken(key) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key, value) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            console.log(err)
        }
    },
};
export default function RootLayout() {
    useFonts({
        'DmSans': require('../assets/fonts/DMSans-Regular.ttf'),
    })
    return (
        <>
            <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
                <SignedIn>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Screen name="index"/>
                        <Stack.Screen name="(tabs)" options={{
                            headerTitle: 'Home',
                        }}/>
                    </Stack>
                </SignedIn>
                <SignedOut>
                    <LoginScreen/>
                </SignedOut>
            </ClerkProvider>
            <StatusBar style="dark"/>
        </>

    );
}
