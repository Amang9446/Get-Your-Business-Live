import { FlatList, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { query, collection, getDocs } from "@firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import React from "react";
import CategoryList from "./CategoryList";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const router = useRouter();
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    GetCategory();
  }, []);
  const GetCategory = async () => {
    try {
      const categoryData = [];
      const q = query(collection(db, "Category"));
      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc) => {
        categoryData.push(doc.data());
      });
      categoryData.sort((a, b) => a.id - b.id);
      setCategory(categoryData);
    } catch (error) {
      console.error(error);
    }
  };
  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push("/businesslist/" + item.name);
    } else {
      onCategorySelect(item.name);
    }
  };
  return (
    <View>
      {!explore && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontFamily: "DmSans", fontSize: 20 }}>Category</Text>
          <Text style={{ fontFamily: "DmSans", color: Colors.PRIMARY }}>
            View All
          </Text>
        </View>
      )}

      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 20 }}
        horizontal={true}
        data={category}
        renderItem={({ item }) => (
          <CategoryList
            category={item}
            key={item.id}
            onCategoryPress={(category) => onCategoryPressHandler(item)}
          />
        )}
      />
    </View>
  );
}
