import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfig";
import { query, collection, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetBusiness();
  }, []);
  const GetBusiness = async () => {
    try {
      setLoading(true);
      setBusinessList([]);
      const q = query(collection(db, "Business List"));
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
      ) : (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ fontFamily: "DmSans", fontSize: 20 }}>
              Popular Business
            </Text>
            <Text style={{ fontFamily: "DmSans", color: Colors.PRIMARY }}>
              View All
            </Text>
          </View>
          <FlatList
            horizontal={true}
            data={businessList}
            renderItem={({ item }) => <PopularBusinessCard business={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}
