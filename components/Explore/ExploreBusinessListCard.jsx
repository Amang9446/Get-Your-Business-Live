import { View, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
export default function ExploreBusinessListCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business?.id)}
      style={{ backgroundColor: "#fff", borderRadius: 15, marginTop: 15 }}
    >
      <Image
        style={{
          width: "100%",
          height: 150,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
        source={{ uri: business.imgUrl }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: "DmSans", fontSize: 20 }}>
          {business?.name}
        </Text>
        <Text style={{ color: Colors.GRAY }}>{business?.address}</Text>
      </View>
    </TouchableOpacity>
  );
}
