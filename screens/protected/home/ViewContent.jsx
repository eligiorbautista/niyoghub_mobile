import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView  } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const ViewContentScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require("../../../assets/niyoghub_banner_1.png")}
          style={styles.headerImage}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationSettings")}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Image source={require('../../../assets/post.png')} style={styles.postImage} />
        <Text style={styles.postCategory}>News & Programs</Text>
        <Text style={styles.postMeta}>April 24, 2024 - 3 min read</Text>
        <Text style={styles.postTitle}>PCA Embraces Culture of Excellence, Undergoes ISO 9001:2015 Reorientation</Text>
        <Text style={styles.content}>
          In its quest for quality service delivery, the employees of the Philippine Coconut Authority underwent a reorientation workshop on ISO 9001:2015-Quality Management System on April 18-19, 2024.

          To harmonize with President Ferdinand E. Marcos’ initiatives on quality management, PCA Administrator Dr. Dexter R. Buted under the Department of Agriculture led by Hon. Sec. Francisco Tiu Lauel Jr., spearheaded the orientation workshop to enhance the agency’s quality management system along with its plan to undergo ISO Certification.

          The activity was participated by PCA employees, primarily targeting the process owners of their respective units, who are expected to effectively implement the insights gained to boost operations and services management, including the enhancement of the Quality Management System Management (QMS) manual and operational plan per unit/department, improved customer satisfaction surveys, strategic identification of need and requirement of interested parties, strategic planning and goal setting, continuous improvement of processes aligned with global standards, among other aspects. 

          Anchored in its Quality Policy, which states ‘To conform with the ISO 9001:2015,’ PCA, at the helm of its newly appointed administrator, Dr. Buted, is headed onward and upward on becoming a leading agency that embraces a culture of quality management and excellence in service delivery.
          “We want to infuse positive change in the agency (PCA), that starts with embracing a quality management system. Quality is not just about meeting the needs of the clientele, but about the ‘culture of consistency’. We are restructuring our roadmap, and ISO is just one part of the strategic direction. We will not stop here. This is the beginning of more progressive days, and we must believe in the power of ‘we’,” Administrator DRB echoed.

          The two-day ISO 1900:2015 was facilitated by the esteemed Quality Assurance experts from Pangasinan State University (PSU) and Universidad de Dagupan (UdD), namely Dr. Ruby Rosa V. Cruz, Director of Research and Extension Services (UdD), covered the ‘Overview of the ISO 9001:2015,’ ‘Clause 9-Performance and Evaluation,’ Dr. Weenalie T. Fajardo, University Director of Curriculum and Instruction (PSU), discussed ‘Clause 4-Context of the Organization,’ ‘Writing Non- conformities,’ Dr. Jenelyn V. Oboza, Vice President for Finance and Administration (PSU), addressed ‘Clause 5-Leadership,’ ‘Clause 10-Improvement,’ ‘Evaluation of Corrective Action,’ Ms. Odessa M. Pacaul, Head of Flexible Learning (PSU), covered ‘Clause 6-Planning,’ Ms. Sheila Marie G. Malicdem, Acting Human Resource Management Officer (PSU), discussed ‘Clause 7- Resources,’ ‘Guidelines in Writing Procedures,’ Dr. Charlaine P. Lopez (PSU) for ‘Clause 8- Operations,’ ‘Conduct of Internal Audit,’ who shared their expertise and experience on quality management strategies, mechanisms, and processes.

          Along with the series of lecture-discussions, the PCA process owners underwent a hands-on writeshop on SWOT Analysis, Needs and requirements of interested parties, Risk Register, Quality Objectives, Procedure Manual.
          The PCA's commitment to quality service delivery is evident through its proactive approach to enhancing its quality management system. Under the leadership of PCA Administrator Dr. Dexter R. Buted and with the guidance of the Department of Agriculture, the agency is on track to achieve ISO certification, marking a significant milestone in its journey toward excellence.

          The reorientation-workshop on ISO 1900:2015 served as a catalyst for positive change, empowering PCA employees to implement best practices and improve operations and services. This initiative aimed to deliver effective and efficient services, aligning with the mandate of improving the lives of coconut farmers through high-quality standards and sustainable practices.

          As the PCA embraces a culture of quality management and excellence, it is poised to become a leading agency, setting a standard for others to follow. With a focus on continuous improvement and adherence to global standards, the PCA is committed to providing exceptional service to its clientele and stakeholders.
        </Text>
      </View>
    </ScrollView>
    </>
  );
};

export default ViewContentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
  },
  text: {
    fontSize: 18, 
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 35,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  postContainer: {
    borderRadius: 8,
    padding: 10,
    paddingVertical: 10,
    padding: 20,
    marginTop: 10,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  postCategory: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
    // backgroundColor: '#D9D9D9'
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  postMeta: {
    fontSize: 12,
    color: '#aaa'
  },
  content: {
    fontSize: 14,
    paddingVertical: 8,
  },
});
