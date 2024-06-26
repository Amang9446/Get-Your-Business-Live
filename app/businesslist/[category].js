import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useLocalSearchParams, useNavigation} from "expo-router";
import {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "@firebase/firestore";
import {db} from "../../configs/FirebaseConfig";
import BusinessList from "../../components/BusinessList/BusinessList";
import {Colors} from "../../constants/Colors";

export default function BusinessListByCategory() {
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const {category} = useLocalSearchParams();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
        });
        if (category === "All") {
            GetAllBusinessList();
        } else {
            GetBusinessList();
        }
    }, [category]);

    const GetAllBusinessList = async () => {
        try {
            setLoading(true);
            setBusinessList([]);
            const q = query(collection(db, 'Business List'));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach((doc) => {
                setBusinessList(prev => [...prev, {id: doc?.id, ...doc.data()}]);
                setLoading(false)
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const GetBusinessList = async () => {
        try {
            setLoading(true);
            setBusinessList([]);
            const q = query(collection(db, 'Business List'), where("category", '==', category));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach((doc) => {
                setBusinessList(prev => [...prev, {id: doc?.id, ...doc.data()}]);
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            {loading ? (
                <ActivityIndicator style={{marginTop: "40%"}} size={'large'} color={Colors.PRIMARY}/>
            ) : businessList.length > 0 ? (
                <FlatList
                    onRefresh={() => category === "All" ? GetAllBusinessList() : GetBusinessList()}
                    refreshing={loading}
                    data={businessList}
                    renderItem={({item, index}) => (
                        <BusinessList business={item} key={index}/>
                    )}
                />
            ) : (
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
                    <Text style={{fontFamily: 'DmSans', fontSize: 30, color: Colors.GRAY}}>No Business Found</Text>
                </View>
            )}
        </View>
    );
}
