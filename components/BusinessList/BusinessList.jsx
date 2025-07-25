import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessList({ business }) {
  const router = useRouter();
  const handleContactClick = () => {
    Linking.openURL("tel:" + business?.contact);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/businessdetail/" + business?.id);
      }}
      style={{
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        margin: 10,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 120, height: 120, borderRadius: 10 }}
        source={{ uri: business?.imgUrl }}
      />
      <View style={{ gap: 5, flex: 1 }}>
        <Text style={{ fontFamily: "DmSans", fontSize: 25 }}>
          {business?.name}
        </Text>
        <Text style={{ color: Colors.GRAY, fontSize: 17 }}>
          {business?.address}
        </Text>
        <View>
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
            <Text style={{ fontFamily: "DmSans" }}>{business?.rating}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "DmSans", fontSize: 15 }}>Contact:</Text>
          <TouchableOpacity onPress={() => handleContactClick()}>
            <Text style={{ color: Colors.PRIMARY, fontSize: 15 }}>
              {" "}
              {business?.contact}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
