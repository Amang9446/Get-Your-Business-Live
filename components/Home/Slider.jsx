import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {collection, query, getDocs} from "@firebase/firestore"; // Changed getDoc to getDocs
import {db} from "../../configs/FirebaseConfig";

export default function Slider() {
    const [sliderList, setSliderList] = React.useState([]);
    const GetSliderList = async () => {
        try {
            setSliderList([])
            const q = query(collection(db, 'Slider'));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach((doc) => {
                setSliderList(prev => [...prev, doc.data()]);
            });
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    }

    React.useEffect(() => {
        GetSliderList();
    }, []);

    return (
        <View>
            <Text style={{fontFamily: 'DmSans', fontSize: 20, paddingLeft: 20, paddingTop: 20, marginBottom: 5}}>#Special
                for you</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={{paddingLeft: 20}}
                horizontal={true}
                data={sliderList}
                renderItem={({item}) => (
                    <Image style={{width: 300, height: 160, borderRadius: 15, marginRight: 20}}
                           source={{uri: item.imageUrl}}/>
                )}
            />
        </View>
    );
}
