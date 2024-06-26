import {View, Text} from "react-native";
import SearchBar from "../../components/SearchBar";
import {Colors} from "../../constants/Colors";
import Category from "../../components/Home/Category";
import {collection, query, where, getDocs} from "@firebase/firestore"
import {db} from "../../configs/FirebaseConfig";
import {useState} from "react";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function Explore() {
    const [businessList, setBusinessList] = useState([]);
    const GetBusiness = async (category) => {
        try {
            setBusinessList([])
            const fbQuery = query(collection(db, 'Business List'), where('category', '==', category))
            const queryData = await getDocs(fbQuery);
            queryData.forEach((doc) => {
                setBusinessList(prev => [...prev, {id: doc?.id, ...doc.data()}]);
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={{padding: 20, marginTop: 30}}>
            <Text style={{fontSize: 30}}>
                Explore More
            </Text>
            <SearchBar style={{borderColor: Colors.PRIMARY, borderWidth: 1}}/>
            <Category explore={true} onCategorySelect={(category) => GetBusiness(category)}/>
            <ExploreBusinessList businessList={businessList}/>
        </View>
    )
}

