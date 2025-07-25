import { ScrollView, View } from "react-native";
import ExploreBusinessListCard from "./ExploreBusinessListCard";

export default function ExploreBusinessList({ businessList }) {
  return (
    <ScrollView>
      <View>
        {businessList.map((item, index) => (
          <View key={index}>
            <ExploreBusinessListCard key={index} business={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
