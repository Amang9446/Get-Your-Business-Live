import {Text, View} from "react-native";

export default function About({business}) {
    return (
        <View style={{backgroundColor: '#fff', padding: 20}}>
            <Text style={{fontFamily: 'DmSans', fontSize: 25, fontWeight: 'bold'}}>About</Text>
            <Text style={{fontFamily: 'DmSans', marginTop: 3, fontSize: 16, lineHeight: 25}}>{business.about}</Text>
        </View>
    )
}