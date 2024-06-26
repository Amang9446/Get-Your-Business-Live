import {View, Text, ScrollView, ActivityIndicator} from "react-native";
import {useNavigation} from "expo-router";
import {useEffect, useState} from "react";
import {db} from "../../configs/FirebaseConfig";
import {query, collection, getDocs, where} from '@firebase/firestore'
import {useUser} from "@clerk/clerk-expo";
import BusinessList from "../../components/BusinessList/BusinessList";
import ActionButton from "../../components/BusinessDetails/ActionButton";
import {Colors} from "../../constants/Colors";

export default function MyBusiness() {
    const {user} = useUser();
    const navigation = useNavigation();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'My Business',
            headerBackTitle: "Profile",
        })
        GetBusinessDetails()
    }, []);

    const GetBusinessDetails = async () => {
        try {
            setBusinessList([])
            const q = query(collection(db, "Business List"), where('userEmail', '==', user.primaryEmailAddress.emailAddress));
            const businessSnapshot = await getDocs(q);
            businessSnapshot.forEach((doc) => {
                setBusinessList(prev => [...prev, {id: doc?.id, ...doc.data()}]);
                setLoading(false)
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <ScrollView>
            <Text style={{padding: 20, fontFamily: 'DmSans', fontSize: 20}}>
                Your Businesses
            </Text>
            {loading ? <ActivityIndicator size={'large'} color={Colors.PRIMARY}/> : (
                <View>
                    {businessList.map((business) => (
                        <BusinessList business={business} key={business.id}/>
                    ))}
                </View>
            )}
        </ScrollView>
    )
}