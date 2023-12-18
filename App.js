import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

// SCREENS
//**shared*//
import ChoiceScreen from "./screens/ChoiceScreen";

//**user*//
import LoginScreen from "./screens/user/LoginScreen";
import StartScreen from "./screens/user/StartScreen";
import SignupScreen from "./screens/user/SignupScreen";
import WelcomeScreen from "./screens/user/WelcomeScreen";
import AllDoctorsScreen from "./screens/user/AllDoctorsScreen";
import AppointmentScreen from "./screens/user/AppointmentScreen";
import AutoDetailsScreen from "./screens/user/AutoDetailsScreen";
import AddressScreen from "./screens/user/AddressScreen";
import CartScreen from "./screens/user/CartScreen";
import CheckoutScreen from "./screens/user/CheckoutScreen";
import DoctorProfileScreen from "./screens/user/DoctorProfileScreen";
import HouseVisitScreen from "./screens/user/HouseVisitScreen";
import ManualDetailsScreen from "./screens/user/ManualDetailsScreen";
import PaymentScreen from "./screens/user/PaymentScreen";
import ShopScreen from "./screens/user/ShopScreen";
import SingleProductScreen from "./screens/user/SingleProductScreen";
import SuccessScreen from "./screens/user/SuccessScreen";
import ProfileScreen from "./screens/user/ProfileScreen";
import SummaryScreen from "./screens/user/SummaryScreen";
import AddressManager from "./screens/user/AddressManager";
import ProfileAddressScreen from "./screens/user/ProfileAddressScreen";
import EditProfileScreen from "./screens/user/EditProfileScreen";
import OrderSuccess from "./screens/user/OrderSuccess";
import ShoppingHistoryScreen from "./screens/user/ShoppingHistoryScreen";
import LabScreen from "./screens/user/LabScreen";
import SearchResultsScreen from "./screens/user/SearchResultsScreen";
import MedicalRecordsScreen from "./screens/user/MedicalRecordsScreen";
import BasePaymentScreen from "./screens/user/BasePaymentScreen";
import SessionHistoryScreen from "./screens/user/SessionHistoryScreen";
import HouseAddressManager from "./screens/user/HouseAddressManager";

//**doctor*//
import DoctorLoginScreen from "./screens/doctor/DoctorLoginScreen";
import DoctorSignUpScreen from "./screens/doctor/DoctorSignUpScreen";
import DoctorWelcomeScreen from "./screens/doctor/DoctorWelcomeScreen";
import AllPatientsScreen from "./screens/doctor/AllPatientsScreen";
import ScheduleScreen from "./screens/doctor/ScheduleScreen";
import DoctorDetailsScreen from "./screens/doctor/DoctorDetailsScreen";
import PatientDetailScreen from "./screens/doctor/PatientDetailScreen";
import PatientSessionsScreen from "./screens/doctor/PatientSessionsScreen";

//ICONS
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  faHouse,
  faBagShopping,
  faCartShopping,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import DoctorLogin from "./components/Auth/DoctorLogin";
import DoctorSignUp from "./components/Auth/DoctorSignUp";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

const Stack = createNativeStackNavigator();
const DocStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const DocBottomTab = createBottomTabNavigator();

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

function DoctorTabNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <DocBottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007fff",
        headerShown: false,
      }}
    >
      <DocBottomTab.Screen
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faHouse} color={Colors.mainBlue} />
          ),
        }}
        name="Welcome2"
        component={DoctorStack}
      />
      <DocBottomTab.Screen
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faUserGroup} color={Colors.mainBlue} />
          ),
        }}
        name="AllPatientsScreen"
        component={AllPatientsScreen}
      />
      <DocBottomTab.Screen
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faCalendar} color={Colors.mainBlue} />
          ),
        }}
        name="ScheduleScreen"
        component={ScheduleScreen}
      />
      <DocBottomTab.Screen
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faUser} color={Colors.mainBlue} />
          ),
        }}
        name="DoctorDetailsScreen"
        component={DoctorDetailsScreen}
      />
    </DocBottomTab.Navigator>
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
      <Stack.Screen name="ChoiceScreen" component={ChoiceScreen} />
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="DoctorLoginScreen" component={DoctorLoginScreen} />
      <Stack.Screen name="DoctorSignUpScreen" component={DoctorSignUpScreen} />
      <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
      <Stack.Screen name="DoctorSignUp" component={DoctorSignUp} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  let isDoctor = false;
  if (authCtx.token.doctor_id) {
    isDoctor = true;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007fff",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={isDoctor ? DoctorTabNavigator : BottomTabNavigator}
      />
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
      <Stack.Screen
        name="SessionHistoryScreen"
        component={SessionHistoryScreen}
      />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
      <Stack.Screen name="LabScreen" component={LabScreen} />
      <Stack.Screen
        name="SearchResultsScreen"
        component={SearchResultsScreen}
      />
      <Stack.Screen name="HouseVisitScreen" component={HouseVisitScreen} />
      <Stack.Screen
        name="MedicalRecordsScreen"
        component={MedicalRecordsScreen}
      />
      <Stack.Screen name="BasePaymentScreen" component={BasePaymentScreen} />
      <Stack.Screen
        name="HouseAddressManager"
        component={HouseAddressManager}
      />
    </Stack.Navigator>
  );
}

function DoctorStack() {
  return (
    <DocStack.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007fff",
        headerShown: false,
      }}
    >
      <DocStack.Screen name="DoctorHome" component={DoctorWelcomeScreen} />
      <DocStack.Screen
        name="PatientDetailScreen"
        component={PatientDetailScreen}
      />
      <DocStack.Screen
        name="PatientSessionsScreen"
        component={PatientSessionsScreen}
      />
    </DocStack.Navigator>
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
        //  await SplashScreen.hideAsync();
      }
    }
    fetchToken();
  }, [appIsReady]);

  if (isTryingLogin) {
    return null;
  }

  if (!authCtx.isAuthenticated) {
    return (
      <>
        <NavigationContainer>
          {!isTryingLogin && <AuthStack />}
        </NavigationContainer>
      </>
    );
  } else {
    return (
      <>
        <NavigationContainer>
          {!isTryingLogin && <AuthenticatedStack />}
        </NavigationContainer>
      </>
    );
  }
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </ApplicationProvider>
    </>
  );
}
