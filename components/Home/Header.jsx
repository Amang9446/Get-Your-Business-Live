import { View, TextInput, Text, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../SearchBar";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 60,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          style={{ width: 45, height: 40, borderRadius: 99 }}
          source={{ uri: user.imageUrl }}
        />
        <View>
          <Text style={{ color: "#fff" }}>Welcome,</Text>
          <Text style={{ fontFamily: "DmSans", fontSize: 19, color: "#fff" }}>
            {user?.fullName}
          </Text>
        </View>
      </View>
      <SearchBar />
    </View>
  );
}
