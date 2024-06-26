import { View, Text, Image, TouchableOpacity, Linking, Share } from "react-native";
import React from 'react';

export default function ActionButton({ business }) {
    const actionButtonMenu = [
        {
            id: 1,
            name: 'Call',
            icon: require('../../assets/images/call.png'),
            url: 'tel:' + business?.contact
        },
        {
            id: 2,
            name: 'Location',
            icon: require('../../assets/images/pin.png'),
            url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address
        },
        {
            id: 3,
            name: 'Web',
            icon: require('../../assets/images/web.png'),
            url: business?.website
        },
        {
            id: 4,
            name: 'Share',
            icon: require('../../assets/images/share.png'),
            url: business?.share
        }
    ];

    const handleOnPress = (item) => {
        if (item?.name === 'Share') {
            Share.share({
                message: business?.name + "\n Address:" + business?.address + "\nFind more details on" + business?.website
            });
            return;
        }
        Linking.openURL(item?.url);
    };

    return (
        <View style={{ backgroundColor: '#fff', padding: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {actionButtonMenu.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => handleOnPress(item)} style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Image style={{ width: 50, height: 50 }} source={item.icon} />
                    <Text style={{ fontFamily: 'DmSans', textAlign: 'center', marginTop: 3 }}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
