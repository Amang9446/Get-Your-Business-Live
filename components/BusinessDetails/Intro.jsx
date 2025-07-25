import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const { user } = useUser();
  const router = useRouter();
  const onDelete = () => {
    Alert.alert(
      "Do you really want to Delete?",
      "This will delete the business",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };
  const deleteBusiness = async () => {
    await deleteDoc(doc(db, "Business List", business.id));
    router.back();
    Alert.alert("Deleted Successfully", "Deleted Successfully");
  };
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 20,
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back-ios-new" size={30} color="white" />
        </TouchableOpacity>
        <Octicons name="heart" size={30} color="white" />
      </View>
      <Image
        style={{ width: "100%", height: 340 }}
        source={{ uri: business?.imgUrl }}
      />
      <View
        style={{
          padding: 20,
          backgroundColor: "#fff",
          marginTop: -20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontFamily: "DmSans", fontSize: 40, fontWeight: "bold" }}
          >
            {business.name}
          </Text>
          {user?.primaryEmailAddress?.emailAddress === business?.userEmail && (
            <TouchableOpacity onPress={() => onDelete()}>
              <MaterialIcons name="delete" size={30} color="red" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{ fontFamily: "DmSans", fontSize: 17 }}>
          {business.address}
        </Text>
      </View>
    </View>
  );
}
