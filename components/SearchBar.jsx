import {TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../constants/Colors";

export default function SearchBar(props) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
            gap: 10,
            ...props.style
        }}>
            <Ionicons name="search" size={24} color={'black'}/>
            <TextInput style={{fontSize: 16, fontFamily: 'DmSans'}} placeholder='Search...'
                       placeholderTextColor={Colors.GRAY}/>
        </View>
    )
}