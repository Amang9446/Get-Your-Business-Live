import { Image, Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function ProfileIntro() {
  const { user } = useUser();
  return (
    <View style={{ marginTop: 30, display: "flex", alignItems: "center" }}>
      <Image
        style={{ width: 100, height: 100, borderRadius: 99 }}
        source={{ uri: user?.imageUrl }}
      />
      <Text style={{ fontFamily: "DmSans", fontSize: 17 }}>
        {user.fullName}
      </Text>
      <Text style={{ fontFamily: "DmSans" }}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}
