import { View, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";

export default function CategoryList({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          padding: 15,
          borderRadius: 99,
          marginRight: 15,
          overflow: "hidden",
        }}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={{ uri: category.icon }}
        />
      </View>
      <Text
        style={{
          fontFamily: "DmSans",
          fontSize: 12,
          textAlign: "center",
          marginTop: 2,
          marginRight: 15,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
