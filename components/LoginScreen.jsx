import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {Colors} from "../constants/Colors";
import {useOAuth} from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import {useWarmUpBrowser} from '../hooks/useWarmUpBrowser'
import * as Haptics from 'expo-haptics';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
    const {startOAuthFlow} = useOAuth({strategy: "oauth_google"});

    const onPress = React.useCallback(async () => {
        try {
            const {createdSessionId, signIn, signUp, setActive} =
                await startOAuthFlow();

            if (createdSessionId) {
                await setActive({session: createdSessionId});
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);
    return (
        <View style={{
            borderWidth: 1,
            flex: 1,
            backgroundColor: '#fff'
        }}>
            <View style={{
                display: "flex",
                alignItems: "center",
                marginTop: responsiveWidth(15),
            }}>
                <Image source={require('../assets/images/login.png')}
                       style={{width: 220, height: 450, borderRadius: 20, borderWidth: 4, borderColor: 'black'}}/>
            </View>
            <View style={styles.subContainer}>
                <Text style={{fontSize: responsiveFontSize(3.5), fontFamily: 'DmSans', textAlign: 'center'}}>Your
                    Ultimate
                    <Text style={{color: Colors.PRIMARY}}> Community Business Directory </Text>App</Text>
                <Text style={{
                    fontSize: responsiveFontSize(2),
                    fontFamily: 'DmSans',
                    textAlign: 'center',
                    marginVertical: 15,
                    color: Colors.GRAY
                }}>Find your
                    favorite business near
                    you and post your own business to your community</Text>

                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <View style={styles.buttonContent}>
                        <Image
                            source={{uri: 'https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png'}}
                            style={styles.googleLogo}
                        />
                        <Text style={styles.buttonText}>Login with Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    subContainer: {
        height: responsiveHeight(100),
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,
        elevation: 1
    },
    button: {
        marginTop: responsiveWidth(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 20,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    googleLogo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        fontFamily: 'DmSans',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
})