import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
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
          title: "Home",
          tabBarIcon: () => <FontAwesomeIcon icon={ faHouse } />,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <BottomTab.Screen
        options={{
          title: "Cart",
          tabBarIcon: () => <FontAwesomeIcon icon={ faBagShopping } />,
        }}
        name="Cart"
        component={CartScreen}
      />
      <BottomTab.Screen
        options={{
          title: "Shop",
          tabBarIcon: () => <FontAwesomeIcon icon={ faCartShopping }  />,
        }}
        name="Shop"
        component={ShopScreen}
      />
      <BottomTab.Screen
        options={{
          title: "Profile",
          tabBarIcon: () => <FontAwesomeIcon icon={ faUser } />,
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

      <Stack.Screen name="AutoDetailsScreen" component={AutoDetailsScreen} />
      <Stack.Screen
        name="ManualDetailsScreen"
        component={ManualDetailsScreen}
      />
      <Stack.Screen name="AllDoctorsScreen" component={AllDoctorsScreen} />
      <Stack.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />

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
  SplashScreen.preventAutoHideAsync();
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(JSON.parse(storedToken));
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    SplashScreen.hideAsync();
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

function BottomTabIcon({ name, icon }) {
  return <Icon name={name} size={20} color="#333" icon={icon} />;
}
