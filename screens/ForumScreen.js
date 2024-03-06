import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../store/auth-context";
import { Path } from "../constants/path";

import HeaderText from "../components/ui/HeaderText";
import PrimaryButton from "../components/ui/PrimaryButton";
import NotificationBell from "../components/ui/NotificationBell";
import ForumCard from "../components/Cards/ForumCard";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import NormalText from "../components/ui/NormalText";

import { Colors } from "../constants/styles";
import { globalStyles } from "../constants/globalcss";
import TransparentButton from "../components/ui/TransparentButton";
import CategoriesCard from "../components/Cards/CategoriesCard";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBookmark,
  faComments,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import IconButton from "../components/ui/IconButton";
import ForumModal from "../components/Modals/ForumModal";

export default function ForumScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [isFetching, setIsFetching] = useState(true);
  const [forums, setForums] = useState([]);
  const [initialForums, setInitialForums] = useState([]);
  const [deleting, setIsDeleting] = useState(false);

  const categories = [
    {
      text: "all",
      keyProp: "all",
    },
    {
      text: "popular",
      keyProp: "popular",
    },
    {
      text: "latest",
      keyProp: "latest",
    },
    {
      text: "yours",
      keyProp: "yours",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all"); // Initialize with 'All' as the selected category

  const baseUrl = Path.API_URL + "forum.php";

  const fetchForums = (callback) => {
    const queryParams = `action=all`;
    const url = `${baseUrl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (callback) {
            callback();
          }
          setIsFetching(false);
          let arr = data.forums;
          if (Array.isArray(arr)) {
            setForums(data.forums);
            setInitialForums(data.forums);
          } else {
            console.log("No forums");
          }
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

  // Add an event listener to refetch forums when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchForums();
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToSingleForum = (forum) => {
    navigation.navigate("ForumDetails", { forum: forum });
  };

  //NEW POST
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  function handleCategoryClick(categoryKey) {
    setSelectedCategory(categoryKey);

    if (categoryKey === "all") {
      setForums(initialForums);
    } else {
      setIsFetching(true);
      let filteredForums = [];

      if (categoryKey === "popular") {
        setIsFetching(true);
        // Assuming you have the comment_count property in your forum object
        const sortedForums = [...initialForums].sort(
          (a, b) => b.comment_count - a.comment_count
        );
        setIsFetching(false);
        setForums(sortedForums);
      } else if (categoryKey === "latest") {
        // Sort forums by forum_date_created in descending order
        filteredForums = [...initialForums].sort(
          (a, b) => b.forum_date_created - a.forum_date_created
        );
      } else if (categoryKey === "yours") {
        // Filter forums where user_id is equal to token.user_id
        filteredForums = initialForums.filter(
          (forum) => forum.user_id === token.user_id
        );
      }

      setIsFetching(false);
      setForums(filteredForums);
    }
  }

 

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 5, backgroundColor: Colors.mainBlue }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <View>
            <HeaderText styleProp={{ color: "#fff", marginLeft: 10 }}>
              Hi,
              {token.user_name}
            </HeaderText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <IconButton
              icon="add-circle"
              color={Colors.mainBlue}
              size={20}
              styleProp={styles.iconButton}
              onPress={() => openModal()}
            />

            <IconButton
              icon="refresh"
              color={Colors.mainBlue}
              size={20}
              styleProp={styles.iconButton}
              onPress={() => fetchForums()}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <Image
            source={{ uri: Path.IMAGE_URL + token.user_image }}
            style={styles.userImage}
          />
        </View>
      </View>

      <ScrollView style={styles.userDetails}>
        {isFetching ? (
          <LoadingOverlay message="Getting your forums" />
        ) : (
          <View>
            <ScrollView horizontal>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                {categories.map((category, index) => (
                  <CategoriesCard
                    key={category.keyProp}
                    categoryName={category.text}
                    onPress={() => handleCategoryClick(category.keyProp)}
                    isSelected={selectedCategory === category.keyProp}
                  />
                ))}
              </View>
            </ScrollView>
            <NormalText></NormalText>
            <View>
              {forums.length > 0 ? (
                forums.map((forum) => (
                  <ForumCard
                    key={forum.forum_id}
                    onPress={() => navigateToSingleForum(forum)}
                    forum={forum}
                  />
                ))
              ) : (
                <View>
                  <NormalText>You have not saved any forums.</NormalText>
                </View>
              )}
            </View>
          </View>
        )}
 
      </ScrollView>

      <ForumModal
        fetchForum={() => fetchForums(closeModal)}
        visible={isModalVisible}
        closeModal={closeModal}
        user={token.user_id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blueBtn: {
    backgroundColor: Colors.mainBlue,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  userDetails: {
    backgroundColor: Colors.mainBlue,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 5,
    marginTop: 10,
    height: "100%",
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#f0f0f1",
  },
  iconButton: {
    backgroundColor: "#fff",
  },
});
