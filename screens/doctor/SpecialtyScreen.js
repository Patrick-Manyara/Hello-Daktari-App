import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { Path } from "../../constants/path";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../constants/globalcss";
import { Colors } from "../../constants/styles";
import MediumText from "../../components/ui/MediumText";
import NormalText from "../../components/ui/NormalText";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function SpecialtyScreen({ route, navigation }) {
  const token = route.params.token;

  const catList = token.category_id;
  const catIds = catList.split("|");

  // SPECIALTIES
  const [doctorCategories, setDoctorCategories] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchSpecialties = () => {
    const fetchurl = Path.API_URL + "doctor.php?action=categories";
    try {
      fetch(fetchurl)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          setDoctorCategories(data.categories);
        })
        .catch((error) => {
          setIsFetching(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsFetching(false);
      console.error("Request setup error:", error);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchSpecialties();
    });

    return unsubscribe;
  }, [navigation]);

  const [selectedCategories, setSelectedCategories] = useState(catIds);

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
    }
  };

  //UPLOADING
  const [isUpdating, setIsUpdating] = useState(false);

  const submitCategoryData = async () => {
    setIsUpdating(true);
    const baseurl = Path.API_URL + "doctor.php";
    const queryParams = `action=update_specialties`;
    const url = `${baseurl}?${queryParams}`;
    const body = new FormData();
    body.append("categories", selectedCategories);
    body.append("doctor_id", token.doctor_id);
    try {
      fetch(url, {
        method: "POST",
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsUpdating(false);
          navigation.navigate("DoctorDetailsScreen");
        })
        .catch((error) => {
          setIsUpdating(false);
          console.error("Fetch error:", error);
        });
    } catch (error) {
      setIsUpdating(false);
      console.error("Request setup error:", error);
    }
  };

  const _maybeRenderUploadingOverlay = () => {
    if (isUpdating) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <ScrollView>
        <MediumText>
          Choose your area of specialty. Multiple may be selected.
        </MediumText>
        <View style={styles.container}>
          {doctorCategories.map((category) => (
            <Pressable
              key={category.doc_category_id}
              style={({ pressed }) => [
                {
                  borderWidth: selectedCategories.includes(
                    category.doc_category_id
                  )
                    ? 2
                    : 0,
                },
                styles.category,
                pressed ? globalStyles.buttonPressed : null,
              ]}
              onPress={() => toggleCategory(category.doc_category_id)}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: Path.IMAGE_URL + category.doc_category_image }}
              />
              <NormalText styleProp={globalStyles.centerText}>
                {category.doc_category_name}
              </NormalText>
            </Pressable>
          ))}
        </View>
        <PrimaryButton onPress={submitCategoryData}>Update</PrimaryButton>
      </ScrollView>
      {_maybeRenderUploadingOverlay()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange child Views in a row
    flexWrap: "wrap", // Allow wrapping to the next row
    width: "100%",
    justifyContent: "flex-start",
  },
  category: {
    flexBasis: "45%",
    width: "45%", // Adjust as needed
    aspectRatio: 1, // Ensure a square aspect ratio
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.mainBlue,

    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 5,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});
