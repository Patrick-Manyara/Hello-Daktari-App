import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Button,
  Image,
  Text,
  ActivityIndicator,
  Alert,
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
import { Divider } from "@ui-kitten/components";
import MediumText from "../components/ui/MediumText";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBookmark,
  faComments,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import { getDayAndMonth } from "../util/dateFormat";
import InputHybrid from "../components/FormElements/InputHybrid";
import IconButton from "../components/ui/IconButton";

export default function ForumDetails({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const forum = route.params?.forum;

  const [isFetching, setIsFetching] = useState(true);
  const [comments, setComments] = useState([]);
  const [initialComments, setInitialComments] = useState([]);
  const [deleting, setIsDeleting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [uploading, setUploading] = useState(false);

  const baseUrl = Path.API_URL + "forum.php";

  const fetchComments = () => {
    const queryParams = `action=comments&forum_id=` + forum.forum_id;
    const url = `${baseUrl}?${queryParams}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsFetching(false);
          let arr = data.comments;
          if (Array.isArray(arr)) {
            setComments(data.comments);
          } else {
            console.log("No comments");
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

  // Add an event listener to refetch comments when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchComments();
    });

    return unsubscribe;
  }, [navigation]);

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
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

  const [enteredComment, setEnteredComment] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "comment_text":
        setEnteredComment(enteredValue);
        break;
    }
  }

  //SUBMISSION



  const url = Path.API_URL + "forum.php?action=add_comment";

  let submitForm = async () => {
    try {
      if (enteredComment != "") {
        setUploading(true);
        const data = new FormData();
        data.append("user_id", token.user_id);
        data.append("forum_id", forum.forum_id);
        data.append("commenter", forum.user_id);
        data.append("comment_text", enteredComment);
        console.log(data);
        fetch(url, {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setUploading(false);
            fetchComments();
          })
          .catch((error) => {
            setUploading(false);
            console.error("Fetch error:", error);
          });
      } else {
        Alert.alert("Invalid input", "Please check your entered credentials.");
      }
    } catch (error) {
      setUploading(false);
      console.error("Request setup error:", error);
    }
  };

  return (
    <SafeAreaView
      style={[globalStyles.safeAreaView, { backgroundColor: "#f0f0f1" }]}
    >
      <ScrollView>
        {isFetching ? (
          <LoadingOverlay message="Getting your comments" />
        ) : (
          <View>
            {/* Forum Details */}
            <View style={styles.forumContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View>
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{ uri: Path.IMAGE_URL + forum.user_image }}
                  />
                </View>
                <View style={{ marginLeft: 10, flex: 1, marginVertical: 5 }}>
                  <MediumText styleProp={{ fontSize: 12 }}>
                    {forum.user_name}
                  </MediumText>
                  <NormalText styleProp={{ fontSize: 10 }}>
                    {getDayAndMonth(forum.forum_date_created)}
                  </NormalText>
                </View>
                <View>
                  <FontAwesomeIcon icon={faBookmark} color={Colors.mainBlue} />
                </View>
              </View>
              <Divider />
              <HeaderText style={styles.forumTitle}>
                {forum.forum_title}
              </HeaderText>
              <NormalText style={styles.forumText}>
                {forum.forum_text}
              </NormalText>
            </View>

            {/* Comments Section */}
            <View>
              <HeaderText styleProp={{ fontSize: 14, color: "black" }}>
                Replies
              </HeaderText>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <View
                    key={comment.comment_id}
                    style={styles.commentContainer}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Image
                          style={{ width: 40, height: 40, borderRadius: 20 }}
                          source={{ uri: Path.IMAGE_URL + comment.user_image }}
                        />
                      </View>
                      <View
                        style={{ marginLeft: 10, flex: 1, marginVertical: 5 }}
                      >
                        <MediumText styleProp={{ fontSize: 12 }}>
                          {comment.user_name}
                        </MediumText>
                        <NormalText styleProp={{ fontSize: 10 }}>
                          {getDayAndMonth(comment.comment_date_created)}
                        </NormalText>
                      </View>
                    </View>
                    <NormalText style={styles.commentText}>
                      {comment.comment_text}
                    </NormalText>
                    <FontAwesomeIcon icon={faEye} color={Colors.mainBlue} />
                  </View>
                ))
              ) : (
                <View style={styles.noCommentsContainer}>
                  <NormalText style={styles.noCommentsText}>
                    No comments yet.
                  </NormalText>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      {/* Comment Input */}
      <View style={styles.commentInputContainer}>
        <InputHybrid
          containerStyle={styles.commentInput}
          placeholder="Add Your Comment..."
          value={enteredComment}
          onUpdateValue={updateInputValueHandler.bind(this, "comment_text")}
          placeholderTextColor="black"
          inputStyle={styles.inputStyle}
        />
        <IconButton
          styleProp={styles.iconButton}
          size={24}
          icon="paper-plane"
          color="white"
          onPress={submitForm}
        />
      </View>
      {_maybeRenderUploadingOverlay()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  forumContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  forumTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  forumText: {
    fontSize: 16,
    color: "#555",
  },
  commentContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  noCommentsContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  noCommentsText: {
    fontSize: 16,
    color: "#555",
  },
  commentInputContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    height: 50,
  },
  inputStyle: {
    fontSize: 12,
  },
  iconButton: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Colors.mainBlue,
  },
});
