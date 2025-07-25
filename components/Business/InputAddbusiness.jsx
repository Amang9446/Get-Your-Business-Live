import { Text, TextInput } from "react-native";
import { Colors } from "../../constants/Colors";

export default function InputAddbusiness({
  name,
  placeholder,
  textStyle,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
  onChangeText,
}) {
  return (
    <>
      <Text style={{ fontSize: 17, fontFamily: "DmSans", ...textStyle }}>
        {name}
      </Text>
      <TextInput
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={{
          borderColor: Colors.GRAY,
          padding: 15,
          borderWidth: 1,
          backgroundColor: "#fff",
          fontFamily: "DmSans",
          textAlign: "start",
          ...inputStyle,
        }}
        placeholder={placeholder}
        placeholderTextColor={Colors.GRAY}
      />
    </>
  );
}
