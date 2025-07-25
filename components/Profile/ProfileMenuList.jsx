import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Share,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function ProfileMenuList() {
  const router = useRouter();
  const { signOut } = useAuth();
  const onMenuPress = (item) => {
    if (item.name === "Log Out") {
      signOut();
      return;
    }
    if (item.name === "Share App") {
      Share.share({
        message: "Download the Business App now",
      });
    }
    if (item.name === "Add Business" || item.name === "My Business") {
      router.push(item.path);
    }
  };
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add.png"),
      path: "/business/addBusiness",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/business-and-trade.png"),
      path: "/business/myBusiness",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Log Out",
      icon: require("../../assets/images/logout.png"),
      path: "logout",
    },
  ];
  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        numColumns={2}
        data={menuList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuPress(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderWidth: 1,
              margin: 10,
              borderRadius: 15,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={item.icon}
            />
            <Text style={{ fontFamily: "DmSans", fontSize: 17, flex: 1 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: "DmSans",
          color: Colors.GRAY,
          marginTop: 50,
          textAlign: "center",
        }}
      >
        App Developed By Aman @{new Date().getFullYear()}
      </Text>
    </View>
  );
}
