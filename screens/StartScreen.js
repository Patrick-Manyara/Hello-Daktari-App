import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { globalStyles } from "../constants/globalcss";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import TabBlocks from "../components/Blocks/TabBlocks";
import TransparentButton from "../components/ui/TransparentButton";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen() {
  const [page, setpage] = React.useState(0);
  const ref = React.useRef();

  const navigation = useNavigation();

  const handleSkip = () => {
    // Navigate to the login screen
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <PagerView
        style={styles.viewPager}
        initialPage={0}
        ref={ref}
        onPageScroll={(e) => {
          let page = e.nativeEvent.position;
          setpage(page);
        }}
      >
        <View style={styles.page} key="0">
          <TabBlocks
            src={require("../assets/images/welcome1.png")}
            mainText="Appointments"
            secondaryText="Lorem ipsum dolor sit amet consectetur. Neque sed a eget elementum turpis lacinia ornare."
          />

          <View style={styles.buttonView}>
            <TransparentButton
              styleProp={styles.btnStyle}
              onPress={() => {
                ref.current?.setPage(2);
              }}
            >
              SKIP
            </TransparentButton>

            <PrimaryButton
              styleProp={styles.btnStyle}
              onPress={() => {
                ref.current?.setPage(1);
              }}
            >
              NEXT
            </PrimaryButton>
          </View>
        </View>

        <View style={styles.page} key="1">
          <TabBlocks
            src={require("../assets/images/welcome2.png")}
            mainText="Upload Your Prescription"
            secondaryText="Lorem ipsum dolor sit amet consectetur. Neque sed a eget elementum turpis lacinia ornare."
          />

          <View style={styles.buttonView}>
            <TransparentButton
              styleProp={styles.btnStyle}
              onPress={() => {
                ref.current?.setPage(2);
              }}
            >
              SKIP
            </TransparentButton>

            <PrimaryButton
              styleProp={styles.btnStyle}
              onPress={() => {
                ref.current?.setPage(2);
              }}
            >
              NEXT
            </PrimaryButton>
          </View>
        </View>

        <View style={styles.page} key="2">
          <TabBlocks
            src={require("../assets/images/welcome3.png")}
            mainText="Shop"
            secondaryText="Lorem ipsum dolor sit amet consectetur. Neque sed a eget elementum turpis lacinia ornare."
          />
          <PrimaryButton onPress={handleSkip} style={styles.btn}>
            Get started
          </PrimaryButton>
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  bottomview: {
    flex: 0.1,
    justifyContent: "center",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circlerow: {
    flexDirection: "row",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {},
  text: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 10,
    textAlign: "center",
    // fontFamily: "Raleway-Regular",
  },
  btnview: {
    flex: 0.18,
  },
  btn: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
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
