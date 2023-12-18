import React from "react";
import { View, StyleSheet, Text } from "react-native";

import NormalText from "../ui/NormalText";
import PrimaryButton from "../ui/PrimaryButton";
import HeaderText from "../ui/HeaderText";

import { Colors } from "../../constants/styles";
import { globalStyles } from "../../constants/globalcss";
import MediumText from "../ui/MediumText";

export default function PrescriptionCard({ prescriptions }) {
  const groupedPrescriptions = prescriptions.reduce((acc, prescription) => {
    const { prescription_id, ...rest } = prescription;
    if (!acc[prescription_id]) {
      acc[prescription_id] = {
        prescriptionDetails: { prescription_id, ...rest },
        labDetails: [],
      };
    }
    acc[prescription_id].labDetails.push({
      lab_id: prescription.lab_id,
      lab_care_name: prescription.lab_care_name,
      lab_amount: prescription.lab_amount,
    });
    return acc;
  }, {});

  // Step 2: Render the grouped data
  const renderPrescriptionViews = () => {
    return Object.values(groupedPrescriptions).map((group, index) => (
      <View style={styles.card} key={index}>
        <View style={styles.tagView}>
          <HeaderText
            styleProp={styles.code}
          >{`Prescription Code: ${group.prescriptionDetails.prescription_code}`}</HeaderText>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <NormalText>Assigned On:</NormalText>
          <NormalText>
            {`${group.prescriptionDetails.prescription_date_created}`}
          </NormalText>
        </View>

        {/* Render lab details in a list */}
        <MediumText>Lab Tests:</MediumText>
        <View>
          {group.labDetails.map((lab, labIndex) => (
            <View key={labIndex} style={styles.labView}>
              <NormalText>{`Test: ${lab.lab_care_name}`}</NormalText>
              <NormalText>{`Amount Paid: Ksh. ${lab.lab_amount}`}</NormalText>
            </View>
          ))}
        </View>
      </View>
    ));
  };

  return <View>{renderPrescriptionViews()}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
    backgroundColor: Colors.lightGrey,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 5,
    // IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  tagView: {
    borderBottomColor: Colors.textColor,
    borderBottomWidth: 0.5,
    marginVertical: 5,
  },
  code: {
    fontSize: 14,
    color: Colors.darkBlue,
  },
  labView: {
    borderLeftColor: Colors.mainPink,
    borderLeftWidth: 10,
    marginVertical: 5,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
