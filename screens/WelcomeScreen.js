import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { AuthContext } from "../store/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../constants/globalcss";
import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import SearchInput from "../components/FormElements/SearchInput";
import BannerBlock from "../components/Blocks/BannerBlock";
import FeaturesBlock from "../components/Blocks/FeaturesBlock";
import AdBlock from "../components/Blocks/AdBlock";

export default function WelcomeScreen() {
  const authCtx = useContext(AuthContext);

  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(authCtx.token);
  }, [authCtx]);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <View>
          <HeaderText>Welcome Back {token.user_name}!</HeaderText>
          <SearchInput />
          <BannerBlock />
          <HeaderText styleProp={globalStyles.smallerText}>
            What we have prepared for you!
          </HeaderText>
          <FeaturesBlock />
          <AdBlock />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
