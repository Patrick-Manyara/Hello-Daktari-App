import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/styles";
import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";

import { useNavigation } from "@react-navigation/native";
import ProfileCard from "../components/Cards/ProfileCard";
import AuthContextProvider, { AuthContext } from "../store/auth-context";
import { Path } from "../constants/path";

export default function EditProfileScreen() {
  return (
    <Text>EditProfileScreen</Text>
  )
}
