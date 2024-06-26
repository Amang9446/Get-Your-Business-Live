import {Alert, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import {Rating} from "react-native-ratings";
import {useState} from "react";
import {Colors} from "../../constants/Colors";
import {arrayUnion, doc, updateDoc} from '@firebase/firestore'
import {useUser} from "@clerk/clerk-expo";
import {db} from "../../configs/FirebaseConfig";

export default function Reviews({business}) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState("");
    const {user} = useUser()
    const onSubmit = async () => {
        try {
            const docRef = doc(db, 'Business List', business?.id);
            await updateDoc(docRef, {
                reviews: arrayUnion({
                    rating: rating,
                    comments: userInput,
                    userName: user?.fullName,
                    imgUrl: user?.imageUrl,
                    email: user?.primaryEmailAddress?.emailAddress
                })
            });
            Alert.alert(`Comment`, 'Added Successfully');
            setUserInput(""); // Reset userInput after successful submission
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={{
            padding: 20,
            backgroundColor: "#fff",
        }}>
            <Text style={{fontFamily: 'DmSans', fontSize: 25}}>Reviews</Text>
            <View
                style={{marginTop: 10, gap: 10}}
            >
                {business?.reviews?.map((review, index) => (
                    <View key={index}
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                              borderWidth: 1,
                              borderRadius: 10,
                              borderColor: Colors.GRAY,
                              padding: 10
                          }}
                    >
                        <Image
                            style={{width: 40, height: 40, borderRadius: 99}}
                            source={{uri: review.imgUrl}}
                        />
                        <View
                            style={{display: 'flex'}}
                        >
                            <Text style={{fontFamily: 'DmSans'}}>{review.userName}</Text>
                            <Rating
                                readonly={true}
                                imageSize={20}
                                startingValue={review?.rating}
                                style={{alignItems: 'flex-start'}}
                            />
                            <Text style={{fontFamily: 'DmSans'}}>
                                {review?.comments}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
            <View
                style={{marginTop: 10}}
            >
                <TextInput
                    onChangeText={(value) =>
                        setUserInput(value)
                    }
                    value={userInput}
                    numberOfLines={4}
                    placeholder='Write a review...'
                    placeholderTextColor={Colors.GRAY}
                    style={{borderWidth: 1, borderColor: Colors.GRAY, borderRadius: 10, padding: 10}}
                    textAlignVertical={'top'}
                />
                <Rating
                    imageSize={30}
                    showRating={false}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{paddingVertical: 10, alignItems: 'flex-start'}}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    style={{padding: 10, backgroundColor: Colors.PRIMARY, borderRadius: 6, marginTop: 10}}
                    onPress={() => onSubmit()}
                >
                    <Text style={{fontFamily: 'DmSans', textAlign: 'center', color: '#fff'}}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}