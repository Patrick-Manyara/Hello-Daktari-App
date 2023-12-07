import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import TabBlocks from "../../components/Blocks/TabBlocks";
import TransparentButton from "../../components/ui/TransparentButton";
import PrimaryButton from "../../components/ui/PrimaryButton";

const FirstRoute = ({ setIndex }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <TabBlocks
      src={require("../assets/images/welcome1.png")}
      mainText="Appointments"
      secondaryText="Lorem ipsum dolor sit amet consectetur. Neque sed a eget elementum turpis lacinia ornare."
    />
    <View style={styles.buttonView}>
      <TransparentButton
        styleProp={styles.btnStyle}
        onPress={() => {
          setIndex(1);
        }}
      >
        Next
      </TransparentButton>
      <PrimaryButton
        styleProp={styles.btnStyle}
        onPress={() => {
          setIndex(2);
        }}
      >
        Skip
      </PrimaryButton>
    </View>
  </View>
);

const SecondRoute = ({ setIndex }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <TabBlocks
      src={require("../assets/images/welcome2.png")}
      mainText="Upload Your Prescription"
      secondaryText="Lorem ipsum dolor sit amet consectetur. Neque sed a eget elementum turpis lacinia ornare."
    />
    <View style={styles.buttonView}>
      <TransparentButton
        styleProp={styles.btnStyle}
        onPress={() => {
          setIndex(2);
        }}
      >
        Next
      </TransparentButton>
      <PrimaryButton
        styleProp={styles.btnStyle}
        onPress={() => {
          setIndex(2);
        }}
      >
        Skip
      </PrimaryButton>
    </View>
  </View>
);

const ThirdRoute = () => {
  const navigation = useNavigation();

  const handleSkip = () => {
    // Navigate to the login screen
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TabBlocks
        src={require("../assets/images/welcome3.png")}
        mainText="Shop"
        secondaryText="Lorem ipsum dolor sit amet consectetur. Neque sed a eget elementum turpis lacinia ornare."
      />
      <View style={styles.singleButtonView}>
        <PrimaryButton styleProp={styles.btnStyle} onPress={handleSkip}>
          Skip
        </PrimaryButton>
      </View>
    </View>

    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>Welcome to the App!</Text>
    //   <Button title="Skip" onPress={handleSkip} />
    // </View>
  );
};

const LandingScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Welcome" },
    { key: "second", title: "Features" },
    { key: "third", title: "Get Started" },
  ]);

  const renderScene = SceneMap({
    first: () => <FirstRoute setIndex={setIndex} />,
    second: () => <SecondRoute setIndex={setIndex} />,
    third: ThirdRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "blue" }}
          style={{ backgroundColor: "white" }}
          renderLabel={() => null} // Hide tab text labels
        />
      )}
    />
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  buttonView: {
    width: "100%",
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnStyle: {
    width: 100,
  },
  singleButtonView: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});
