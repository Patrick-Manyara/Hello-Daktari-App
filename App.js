import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { CartProvider } from "./store/cart-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// SCREENS
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AllDoctorsScreen from "./screens/AllDoctorsScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import AutoDetailsScreen from "./screens/AutoDetailsScreen";
import AddressScreen from "./screens/AddressScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import DoctorProfileScreen from "./screens/DoctorProfileScreen";
import HomeVisitScreen from "./screens/HomeVisitScreen";
import ManualDetailsScreen from "./screens/ManualDetailsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ShopScreen from "./screens/ShopScreen";
import SingleProductScreen from "./screens/SingleProductScreen";
import SuccessScreen from "./screens/SuccessScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SummaryScreen from "./screens/SummaryScreen";
import AddressManager from "./screens/AddressManager";
import ProfileAddressScreen from "./screens/ProfileAddressScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import OrderSuccess from "./screens/OrderSuccess";
import ShoppingHistoryScreen from "./screens/ShoppingHistoryScreen";

//COMPONENTS
import TabBlocks from "./components/Blocks/TabBlocks";

//ICONS
import Icon from "react-native-vector-icons/FontAwesome5"; // Import FontAwesome 5 icon set
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  faHouse,
  faBagShopping,
  faCartShopping,
  faUser,
  faU,
} from "@fortawesome/free-solid-svg-icons";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

function BottomTabNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007fff",
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faHouse} color={Colors.mainBlue} />
          ),
        }}
        name="Welcome"
        component={HomeStack}
      />
      <BottomTab.Screen
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faBagShopping} color={Colors.mainBlue} />
          ),
        }}
        name="Shop"
        component={ShopScreen}
      />
      <BottomTab.Screen
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faCartShopping} color={Colors.mainBlue} />
          ),
        }}
        name="Cart"
        component={CartScreen}
      />
      <BottomTab.Screen
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faUser} color={Colors.mainBlue} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.whiteBg },
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007fff",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007fff",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home2" component={WelcomeScreen} />

      <Stack.Screen name="AutoDetailsScreen" component={AutoDetailsScreen} />
      <Stack.Screen
        name="ManualDetailsScreen"
        component={ManualDetailsScreen}
      />
      <Stack.Screen name="AllDoctorsScreen" component={AllDoctorsScreen} />
      <Stack.Screen
        name="DoctorProfileScreen"
        component={DoctorProfileScreen}
      />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen name="AddressManager" component={AddressManager} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="Shop2" component={ShopScreen} />
      <Stack.Screen
        name="SingleProductScreen"
        component={SingleProductScreen}
      />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="ProfileScreen2" component={ProfileScreen} />
      <Stack.Screen
        name="ProfileAddressScreen"
        component={ProfileAddressScreen}
      />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen
        name="ShoppingHistoryScreen"
        component={ShoppingHistoryScreen}
      />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(JSON.parse(storedToken));
      }
      setIsTryingLogin(false);
      setAppIsReady(true);
      if (appIsReady) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
      }
    }
    fetchToken();
  }, [appIsReady]);

  // if (isTryingLogin) {
  //   return <AppLoading />
  // }
  if (!appIsReady) {
    return null;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
