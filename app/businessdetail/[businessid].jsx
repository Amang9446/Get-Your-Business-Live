import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../configs/FirebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetails/Intro";
import ActionButton from "../../components/BusinessDetails/ActionButton";
import About from "../../components/BusinessDetails/About";
import Reviews from "../../components/BusinessDetails/Reviews";

export default function BusinessDetail() {
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    GetBusinessDetailsById();
  }, []);
  const GetBusinessDetailsById = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "Business List", businessid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBusiness({ id: docSnap?.id, ...docSnap.data() });
        setLoading(false);
      } else {
        console.log("No such Document Found");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const { businessid } = useLocalSearchParams();
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <View>
          <Intro business={business} />
          <ActionButton business={business} />
          <About business={business} />
          <Reviews business={business} />
        </View>
      )}
    </ScrollView>
  );
}
