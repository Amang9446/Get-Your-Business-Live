import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PopularBusinessCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business?.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        gap: 5,
      }}
    >
      <Image
        style={{ width: 250, height: 150, borderRadius: 15 }}
        source={{ uri: business.imgUrl }}
      />
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontFamily: "DmSans", fontSize: 20 }}>
          {business.name}
        </Text>
        <Text style={{ fontFamily: "DmSans", color: Colors.GRAY }}>
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../../assets/images/star.png")}
            />
            <Text style={{ fontFamily: "DmSans" }}>{business.rating}</Text>
          </View>
          <Text
            style={{
              fontFamily: "DmSans",
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              padding: 3,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
