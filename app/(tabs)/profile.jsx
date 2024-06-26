import {Text, View} from "react-native";
import {useAuth} from "@clerk/clerk-expo";
import ProfileIntro from "../../components/Profile/ProfileIntro";
import ProfileMenuList from "../../components/Profile/ProfileMenuList";

export default function Profile() {
    const {signOut, userId, sessionId, getToken} = useAuth();
    return (
        <View style={{padding: 20, marginTop: 30}}>
            <Text style={{fontFamily: 'DmSans', fontSize: 40}}>
                Profile
            </Text>
            <ProfileIntro/>
            <ProfileMenuList/>
        </View>
    )
}