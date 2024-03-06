import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  Linking,
  ActivityIndicator,
} from "react-native";

import PrimaryButton from "../ui/PrimaryButton";
import NormalText from "../ui/NormalText";

import { Path } from "../../constants/path";
// import { globalStyles } from "../constants/globalcss";

import { Colors } from "../../constants/styles";
import InputHybrid from "../FormElements/InputHybrid";
import IconButton from "../ui/IconButton";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBookmark,
  faComments,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import TransparentButton from "../ui/TransparentButton";

export default function ForumModal({ visible, closeModal, fetchForum, user }) {
  const [enteredComment, setEnteredComment] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [uploading, setUploading] = useState(false);

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

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "forum_title":
        setEnteredTitle(enteredValue);
        break;
      case "forum_text":
        setEnteredComment(enteredValue);
        break;
    }
  }

  const postUrl = Path.API_URL + "forum.php?action=add_forum";

  let submitForm = async () => {
    try {
      if (enteredComment != "" && enteredTitle != "") {
        setUploading(true);
        const data = new FormData();
        data.append("user_id", user);
        data.append("forum_text", enteredComment);
        data.append("forum_title", enteredTitle);
        console.log(data);
        fetch(postUrl, {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setUploading(false);
            fetchForum();
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

  //SUBMISSION

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.modalInnerView}>
          <View>
            <InputHybrid
              containerStyle={styles.titleInput}
              placeholder="Add Your Title..."
              label="Title"
              value={enteredTitle}
              onUpdateValue={updateInputValueHandler.bind(this, "forum_title")}
              placeholderTextColor="black"
              inputStyle={styles.inputStyle}
            />
            <InputHybrid
              containerStyle={styles.commentInput}
              placeholder="Add Your Comment..."
              label="Post"
              value={enteredComment}
              onUpdateValue={updateInputValueHandler.bind(this, "forum_text")}
              placeholderTextColor="black"
              inputStyle={styles.inputStyle}
            />

            <TransparentButton onPress={submitForm}>Post</TransparentButton>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <IconButton
              styleProp={styles.iconButton}
              size={24}
              icon="close"
              color="black"
              onPress={closeModal}
            />
          </View>
        </View>
      </View>
      {_maybeRenderUploadingOverlay()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background to dim the rest of the screen
  },
  modalInnerView: {
    width: "100%", // Adjust the width of the modal as needed
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  titleInput: {
    borderRadius: 8,
    padding: 8,
    height: 50,
  },
  commentInput: {
    borderRadius: 8,
    padding: 8,
    height: 100,
  },
  inputStyle: {
    fontSize: 12,
  },
  iconButton: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Colors.mainPink,
  },
});
