import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import {useNavigation} from "expo-router";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
} from "@firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "@firebase/storage";
import {db, storageBucket} from "../../configs/FirebaseConfig";
import {useUser} from "@clerk/clerk-expo";
import {Colors} from "../../constants/Colors";
import InputAddbusiness from "../../components/Business/InputAddbusiness";

export default function AddBusiness() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [website, setWebsite] = useState("");
    const [about, setAbout] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [uploadImage, setUploadImage] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const {user} = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Add Business",
            headerBackTitle: "Profile",
        });
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setCategory([]);
            const q = query(collection(db, "Category"));
            const categoriesSnapshot = await getDocs(q);
            const categories = categoriesSnapshot.docs.map((doc) => ({
                label: doc.data().name,
                value: doc.data().name,
            }));
            setCategory(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImagetoFirebase = async () => {
        try {
            setLoading(true);
            const fileName = `${Date.now()}.jpg`;
            const response = await fetch(image);
            const blob = await response.blob();
            const imageRef = ref(storageBucket, `business-app/${fileName}`);
            await uploadBytes(imageRef, blob);
            const downloadURL = await getDownloadURL(imageRef);
            setUploadImage(downloadURL);
            await submitBusiness(downloadURL);
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false);
        }
    };

    const submitBusiness = async (downloadURL) => {
        try {
            await setDoc(doc(db, "Business List", `${Date.now()}`), {
                name,
                address,
                contact,
                website,
                about,
                category: categoryValue,
                imgUrl: downloadURL,
                userName: user?.fullName,
                userEmail: user?.primaryEmailAddress?.emailAddress,
            });
            setLoading(false);
            Alert.alert("Business Information", "Added successfully!");
            setName("");
            setAddress("");
            setContact("");
            setWebsite("");
            setAbout("");
            setCategoryValue("");
            setUploadImage("");
            setImage(null);
        } catch (error) {
            console.error("Error adding business:", error);
            setLoading(false);
            Alert.alert(`Error: ${error.message}`);
        }
    };

    const handleAddBusiness = async () => {
        if (image) {
            await uploadImagetoFirebase();
        } else {
            Alert.alert("Please select an image.");
        }
    };

    return (
        <ScrollView style={{padding: 20}}>
            <Text style={{fontSize: 20, fontFamily: "DmSans"}}>
                Add Business Information
            </Text>
            <Text style={{color: Colors.GRAY, fontFamily: "DmSans", fontSize: 12}}>
                Fill all the details to add a new business
            </Text>
            <TouchableOpacity onPress={pickImage} style={{marginTop: 20}}>
                {!image ? (
                    <View style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                        <Image
                            style={{width: 100, height: 100}}
                            source={require("../../assets/images/ImageUpload.png")}
                        />
                        <Text style={{fontFamily: 'DmSans', fontSize: 19, textAlign: 'center'}}>
                            Pick an Image
                        </Text>
                    </View>

                ) : (
                    <Image
                        style={{width: 100, height: 100, borderRadius: 20}}
                        source={{uri: image}}
                    />
                )}
            </TouchableOpacity>
            <View style={{marginTop: 15, gap: 3}}>
                <InputAddbusiness
                    onChangeText={setName}
                    name="Business Name"
                    placeholder="Enter Business Name"
                />
                <InputAddbusiness
                    onChangeText={setAddress}
                    name="Address"
                    placeholder="Enter the Address"
                />
                <InputAddbusiness
                    onChangeText={setContact}
                    name="Contact"
                    placeholder="Enter Contact Information"
                />
                <InputAddbusiness
                    onChangeText={setWebsite}
                    name="Website"
                    placeholder="Enter the Website URL"
                />
                <InputAddbusiness
                    onChangeText={setAbout}
                    multiline
                    numberOfLines={3}
                    name="About"
                    placeholder="Enter About"
                    inputStyle={{height: 100}}
                />
            </View>
            <View style={{marginTop: 5, gap: 3}}>
                <Text style={{fontSize: 17, fontFamily: "DmSans"}}>Select Category</Text>
                <View
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        backgroundColor: "#fff",
                        borderColor: Colors.GRAY,
                        height: 50,
                        justifyContent: "center",
                    }}
                >
                    <RNPickerSelect
                        onValueChange={setCategoryValue}
                        items={category}
                    />
                </View>
            </View>
            <TouchableOpacity
                disabled={loading}
                onPress={handleAddBusiness}
                style={{
                    backgroundColor: Colors.PRIMARY,
                    marginTop: 20,
                    borderRadius: 7,
                    padding: 15,
                }}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#fff"/>
                ) : (
                    <Text
                        style={{
                            fontFamily: "DmSans",
                            fontSize: 20,
                            textAlign: "center",
                            color: "#fff",
                        }}
                    >
                        Add Business
                    </Text>
                )}
            </TouchableOpacity>
            <View style={{height: 100}}/>
        </ScrollView>
    );
}
