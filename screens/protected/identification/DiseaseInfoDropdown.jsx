import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';

import { Ionicons } from "@expo/vector-icons";
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'; 
import { useNavigation, useRoute } from "@react-navigation/native";

const DiseaseInfoDropdown = ({ highestConfidenceClass }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();

  const diseaseInfo = {
    WCLWD_Yellowing: {
      title: 'Yellowing/Leaf Spot Disease',
      content: [
        { 
          icon: <Ionicons name="information" size={24} color="#537F19" />, 
          title: 'Identification of Disease/Pest', 
          content: 'Coconut Lethal Yellowing Disease (LYD) is a devastating disease affecting coconut palms and other palm species. It is caused by a phytoplasma, a type of bacteria-like organism that invades the vascular tissues of plants, disrupting nutrient transport and leading to plant death if left untreated.' },
        { 
          icon: <Ionicons name="warning-outline" size={24} color="#537F19" />, 
          title: 'Symptoms of Damage', 
          content: <Text>
                    1. <Text style={styles.boldText}>Premature Nut Drop: </Text>
                      Immature nuts fall early, reducing yield.{'\n'}
                  
                    2. <Text style={styles.boldText}>Yellowing of Fronds: </Text>
                     Leaves, starting from the lower ones, yellow and die, spreading upward.{'\n'}
                  
                    3. <Text style={styles.boldText}>Necrosis of Inflorescences: </Text>
                     Flower clusters turn black and die, reducing nut production.{'\n'}
                  
                    4. <Text style={styles.boldText}>Crown Wilting and Death: </Text>
                     Fronds collapse, crown wilts, leading to the tree's death.{'\n'}
                  
                    5. <Text style={styles.boldText}>Stunted Growth: </Text>
                     Younger palms become smaller and weaker.
                  </Text>
        },
        { 
          icon: <Ionicons name="stopwatch-outline" size={24} color="#537F19" />,
          title: 'Prevention', 
          content: <Text>
          1. <Text style={styles.boldText}>Use of Disease-Free Planting Materials: </Text>
             Plant certified, disease-free seedlings. Avoid palms from areas with lethal yellowing.{'\n'}
        
          2. <Text style={styles.boldText}>Plant Resistant Varieties: </Text>
             Use resistant varieties like Malayan Dwarf, Maypan Hybrid, and Fiji Dwarf.{'\n'}
        
          3. <Text style={styles.boldText}>Quarantine Practices: </Text>
             Restrict the movement of palms from infected areas to prevent spread.{'\n'}
        
          4. <Text style={styles.boldText}>Monitoring and Early Detection: </Text>
             Regularly inspect palms for early symptoms like nut drop or yellowing leaves.
        </Text>
        
        },
        { 
          icon: <Ionicons name="bug-outline" size={24} color="#537F19" />, 
          title: 'Control Measures', 
          content: <Text>
                    1. <Text style={styles.boldText}>Removal of Infected Trees: </Text>
                      Remove and destroy infected trees to prevent the disease from spreading.{'\n'}
                  
                    2. <Text style={styles.boldText}>Chemical Control: </Text>
                      Oxytetracycline injections can temporarily suppress symptoms but must be repeated every 3-4 months. Not a cure.{'\n'}
                  
                    3. <Text style={styles.boldText}>Vector Control: </Text>
                      Control insect populations (e.g., Myndus crudus) with insecticides or biological agents to reduce disease spread.{'\n'}
                  
                    4. <Text style={styles.boldText}>Sanitation Practices: </Text>
                      Maintain sanitation in nurseries and fields by removing debris or infected materials.{'\n'}
                  
                    5. <Text style={styles.boldText}>Pruning and Care of Healthy Palms: </Text>
                      Proper pruning improves airflow and reduces the risk of insect infestations.
                  </Text>
        },
        { 
          icon: <Ionicons name="leaf-outline" size={24} color="#537F19" />,
          title: 'Resistant Coconut Variety', 
          content: <Text>
                  Certain coconut varieties are more resistant to lethal yellowing, including:{'\n'}
                  1. <Text style={styles.boldText}>Malayan Dwarf: </Text>
                    Yellow, Red, and Green Dwarfs show significant resistance and adapt well to tropical climates.{'\n'}
                  2. <Text style={styles.boldText}>Maypan Hybrid: </Text>
                    A cross between Malayan Dwarf and Panama Tall, bred for resistance and widely planted in the Philippines.{'\n'}
                  3. <Text style={styles.boldText}>Fiji Dwarf: </Text>
                    Resistant, though a slower grower, and suitable for tropical conditions.
                </Text>
        },
      ],
    },
    WCLWD_DryingofLeaflets: {
      title: 'Drying of Leaflets',
      content: [
        { 
          icon: <Ionicons name="information" size={24} color="#537F19" />, 
          title: 'Identification of Disease/Pest', 
          content: 'The drying of leaflets in coconut trees can be associated with a range of factors, including diseases, nutrient deficiencies, or environmental stresses. One of the notable diseases that causes drying of leaflets is Coconut Leaf Blight or Leaf Rot Disease. This condition can be caused by various pathogens, such as fungi or bacteria, and environmental factors that affect the health of the tree.' 
        },
        { 
          icon: <Ionicons name="warning-outline" size={24} color="#537F19" />, 
          title: 'Symptoms of Damage', 
          content: <Text>
                    1. <Text style={styles.boldText}>Drying and Browning of Leaflets: </Text>
                      Small yellow to brown spots appear on older leaves, leading to leaflet drying and curling.{'\n'}
                    2. <Text style={styles.boldText}>Progressive Leaf Drying: </Text>
                      Leaves dry out from the tips, turning brown and brittle as the disease worsens.{'\n'}
                    3. <Text style={styles.boldText}>Wilting of Leaves: </Text>
                      Entire leaves may wilt, becoming pale or grayish.{'\n'}
                    4. <Text style={styles.boldText}>Reduced Yield: </Text>
                      Severe infections reduce coconut yield as leaf drying limits photosynthesis.{'\n'}
                    5. <Text style={styles.boldText}>Crown Dieback: </Text>
                      In extreme cases, the upper parts of the palm dry and collapse.
                  </Text>
        },
        { 
          icon: <Ionicons name="stopwatch-outline" size={24} color="#537F19" />,
          title: 'Prevention', 
          content: <Text>
                    1. <Text style={styles.boldText}>Proper Planting Practices: </Text>
                      Ensure good spacing to promote air circulation and reduce humidity.{'\n'}
                    2. <Text style={styles.boldText}>Use Disease-Free Seedlings: </Text>
                      Plant certified, healthy seedlings to prevent disease introduction.{'\n'}
                    3. <Text style={styles.boldText}>Regular Monitoring: </Text>
                      Inspect palms regularly for early signs of leaf drying, especially after rain.{'\n'}
                    4. <Text style={styles.boldText}>Nutrient Management: </Text>
                      Provide proper nutrients (nitrogen, potassium, zinc) to maintain tree health.
                  </Text>
        },
        { 
          icon: <Ionicons name="bug-outline" size={24} color="#537F19" />, 
          title: 'Control Measures', 
          content: <Text>
                    1. <Text style={styles.boldText}>Pruning of Infected Leaves: </Text>
                      Prune and dispose of infected fronds to prevent disease spread; burn or bury materials far from the plantation.{'\n'}
                    2. <Text style={styles.boldText}>Fungicide Treatment: </Text>
                      Apply copper-based or systemic fungicides early in infection to control spread.{'\n'}
                    3. <Text style={styles.boldText}>Improved Drainage: </Text>
                      Enhance drainage to prevent water stagnation, which encourages fungal infections.{'\n'}
                    4. <Text style={styles.boldText}>Sanitation Practices: </Text>
                      Remove dead leaves and debris to reduce fungal pathogen habitats.
                  </Text>        
        },
        { 
          icon: <Ionicons name="leaf-outline" size={24} color="#537F19" />,
          title: 'Resistant Coconut Variety', 
          content: <Text>
                    Resistant coconut varieties for preventing leaflet drying, suitable for the Philippine climate include:{'\n'}
                    1. <Text style={styles.boldText}>Malayan Dwarf: </Text>
                      Green, Yellow, and Red varieties are resistant to leaf blight and fungal diseases, thriving in humid conditions.{'\n'}
                    2. <Text style={styles.boldText}>Tacunan Dwarf: </Text>
                      Local variety, drought-tolerant, and resistant to leaf blight.{'\n'}
                    3. <Text style={styles.boldText}>Baybay Tall: </Text>
                      Adaptable to various climates, resistant to leaf diseases.{'\n'}
                    4. <Text style={styles.boldText}>San Ramon Tall: </Text>
                      Strong resistance to leaf blight and drought; thrives in high humidity.{'\n'}
                    5. <Text style={styles.boldText}>Maypan Hybrid: </Text>
                      Bred for resistance to leaf blight and environmental stress.
                  </Text>        
        },
      ],
    },
    WCLWD_Flaccidity: {
      title: 'Flaccidity',
      content: [
        { 
          icon: <Ionicons name="information" size={24} color="#537F19" />, 
          title: 'Identification of Disease/Pest', 
          content: 'Flaccidity disease in coconut trees, also known as coconut bud rot, is a serious disease caused by fungal or bacterial pathogens, particularly Phytophthora palmivora. It primarily affects the growing point or bud of the coconut palm, leading to the eventual death of the tree if not controlled.' 
        },
        { 
          icon: <Ionicons name="warning-outline" size={24} color="#537F19" />, 
          title: 'Symptoms of Damage', 
          content: <Text>
                    1. <Text style={styles.boldText}>Flaccid, Drooping Leaves: </Text>
                      Leaves near the bud become limp and droop, especially younger ones.{'\n'}
                    2. <Text style={styles.boldText}>Softening of the Growing Point: </Text>
                      The bud softens and rots, causing an unpleasant odor as decay progresses.{'\n'}
                    3. <Text style={styles.boldText}>Yellowing and Browning of Leaves: </Text>
                      Affected leaves turn yellow and brown, drying up as the disease spreads.{'\n'}
                    4. <Text style={styles.boldText}>Bud Collapse: </Text>
                      The terminal bud collapses, leading to the tree's death; the entire crown may die in advanced stages.
                  </Text>
        },
        { 
          icon: <Ionicons name="stopwatch-outline" size={24} color="#537F19" />,
          title: 'Prevention', 
          content: <Text>
                    1. <Text style={styles.boldText}>Use of Disease-Free Seedlings: </Text>
                      Plant certified disease-free seedlings to prevent pathogen introduction.{'\n'}
                    2. <Text style={styles.boldText}>Good Drainage: </Text>
                      Ensure proper drainage to prevent waterlogging, which encourages fungal growth.{'\n'}
                    3. <Text style={styles.boldText}>Regular Monitoring: </Text>
                      Inspect palms regularly, especially during rainy seasons, for early signs of bud rot and flaccidity.
                  </Text>
        },
        { 
          icon: <Ionicons name="bug-outline" size={24} color="#537F19" />, 
          title: 'Control Measures', 
          content: <Text>
                    1. <Text style={styles.boldText}>Fungicide Application: </Text>
                      Apply systemic fungicides like metalaxyl or copper-based fungicides early to control infection.{'\n'}
                    2. <Text style={styles.boldText}>Removal of Infected Trees: </Text>
                      Remove and destroy severely affected trees to prevent disease spread to nearby palms.{'\n'}
                    3. <Text style={styles.boldText}>Sanitation: </Text>
                      Maintain proper sanitation by removing debris and infected materials from the plantation.
                  </Text>
        },
        { 
          icon: <Ionicons name="leaf-outline" size={24} color="#537F19" />,
          title: 'Resistant Coconut Variety', 
          content:  <Text>
                    1. <Text style={styles.boldText}>Malayan Dwarf: </Text>
                      Resistant to bud rot and fungal infections.{'\n'}
                    2. <Text style={styles.boldText}>Maypan Hybrid: </Text>
                      Bred for resistance to bud rot and flaccidity.{'\n'}
                    3. <Text style={styles.boldText}>Tacunan Dwarf: </Text>
                      Resistant to fungal infections, suited for tropical climates like the Philippines.
                  </Text>
        },
      ],
    },
    CCI_Caterpillars: {
      title: 'Caterpillars',
      content: [
        { 
          icon: <Ionicons name="information" size={24} color="#537F19" />, 
          title: 'Identification of Disease/Pest', 
          content: 'This disease is primarily caused by the feeding of caterpillars (such as the coconut leaf caterpillar) on coconut leaves, leading to significant damage and reduced productivity. These pests can severely weaken the tree by consuming foliage, which affects photosynthesis and overall growth.' 
        },
        { 
          icon: <Ionicons name="warning-outline" size={24} color="#537F19" />, 
          title: 'Symptoms of Damage', 
          content: <Text>
                    1. <Text style={styles.boldText}>Leaf Skeletonization: </Text>
                      Caterpillars feed on leaves, leaving only the veins.{'\n'}
                    2. <Text style={styles.boldText}>Chewed or Ragged Leaves: </Text>
                      Leaves appear chewed and ragged with large sections missing.{'\n'}
                    3. <Text style={styles.boldText}>Reduced Photosynthesis: </Text>
                      Severe infestations hinder photosynthesis, affecting growth and nut production.{'\n'}
                    4. <Text style={styles.boldText}>Frass Droppings: </Text>
                      Presence of caterpillar droppings on leaves or around the tree base indicates infestation.
                  </Text>
        },
        { 
          icon: <Ionicons name="stopwatch-outline" size={24} color="#537F19" />,
          title: 'Prevention', 
          content: <Text>
                    1. <Text style={styles.boldText}>Regular Monitoring: </Text>
                      Inspect coconut trees often, especially during the rainy season, to catch infestations early.{'\n'}
                    2. <Text style={styles.boldText}>Maintain Field Sanitation: </Text>
                      Remove debris and infested leaves to reduce caterpillar breeding sites.{'\n'}
                    3. <Text style={styles.boldText}>Promote Biological Control: </Text>
                      Encourage natural predators like birds and parasitoid wasps for a balanced ecosystem.{'\n'}
                    </Text> 
        },
        { 
          icon: <Ionicons name="bug-outline" size={24} color="#537F19" />, 
          title: 'Control Measures', 
          content: <Text>
                    1. <Text style={styles.boldText}>Biological Control: </Text>
                      Use natural enemies like parasitoid wasps or predators to control caterpillar populations.{'\n'}
                    2. <Text style={styles.boldText}>Insecticide Application: </Text>
                      Apply neem-based products or Bacillus thuringiensis (Bt) during early larval stages.{'\n'}
                    3. <Text style={styles.boldText}>Manual Removal: </Text>
                      Regularly inspect and remove infested leaves to limit spread.{'\n'}
                    4. <Text style={styles.boldText}>Regular Pruning: </Text>
                      Prune heavily infested leaves to prevent further infestation.
                  </Text> 
        },
        { 
          icon: <Ionicons name="leaf-outline" size={24} color="#537F19" />,
          title: 'Resistant Coconut Variety', 
          content: <Text>
                    1. <Text style={styles.boldText}>Malayan Dwarf: </Text>
                      Resilient against pest infestations, including caterpillars.{'\n'}
                    2. <Text style={styles.boldText}>Maypan Hybrid: </Text>
                      Known for its hardiness and resistance to common pests.{'\n'}
                    3. <Text style={styles.boldText}>Tacunan Dwarf: </Text>
                      Moderately resistant to pest damage, suited for tropical climates.
                  </Text>
        },
      ],
    },
    CCI_Leaflets: {
      title: 'Leaflets',
      content: [
        { 
          icon: <Ionicons name="information" size={24} color="#537F19" />, 
          title: 'Identification of Disease/Pest', 
          content: 'This disease affects coconut trees, causing their leaflets to dry up and die due to various pathogens, particularly fungal infections. It can result from environmental stressors, including drought or excessive rainfall, which can weaken the trees and make them more susceptible to infections.' 
        },
        { 
          icon: <Ionicons name="warning-outline" size={24} color="#537F19" />, 
          title: 'Symptoms of Damage', 
          content: <Text>
                    1. <Text style={styles.boldText}>Yellowing of Leaflets: </Text>
                      Leaflets turn yellow and dry, indicating nutrient deficiencies or infection.{'\n'}
                    2. <Text style={styles.boldText}>Wilting and Drying: </Text>
                      Leaves become brittle and dry, starting from tips and margins.{'\n'}
                    3. <Text style={styles.boldText}>Premature Leaf Drop: </Text>
                      Severely affected leaves may drop early, reducing photosynthesis.{'\n'}
                    4. <Text style={styles.boldText}>Fungal Structures: </Text>
                      Infected leaves may display black spots or powdery mildew.
                  </Text>
        },
        { 
          icon: <Ionicons name="stopwatch-outline" size={24} color="#537F19" />,
          title: 'Prevention', 
          content:  <Text>
                      1. <Text style={styles.boldText}>Use Disease-Free Seedlings: </Text>
                        Plant certified disease-free seedlings to prevent pathogens.{'\n'}
                      2. <Text style={styles.boldText}>Ensure Good Drainage: </Text>
                        Prevent waterlogging around palms to reduce fungal growth.{'\n'}
                      3. <Text style={styles.boldText}>Regular Monitoring: </Text>
                        Inspect palms frequently, especially during rainy seasons.
                    </Text>
        },
        { 
          icon: <Ionicons name="bug-outline" size={24} color="#537F19" />, 
          title: 'Control Measures', 
          content: <Text>
                    1. <Text style={styles.boldText}>Fungicide Application: </Text>
                    Apply systemic fungicides like metalaxyl or copper-based fungicides to control the spread of the pathogen.{'\n'}
                    2. <Text style={styles.boldText}>Removal of Infected Trees: </Text>
                    Remove and destroy severely affected trees to prevent the spread of the disease to other nearby palms.{'\n'}
                    3. <Text style={styles.boldText}>Sanitation: </Text>
                    Maintain proper field sanitation by removing debris and infected materials from the plantation.
                  </Text>
        },
        { 
          icon: <Ionicons name="leaf-outline" size={24} color="#537F19" />,
          title: 'Resistant Coconut Variety', 
          content:  <Text>
          1. <Text style={styles.boldText}>Malayan Dwarf: </Text>
          Known for its resistance to leaf blight and fungal diseases that can cause leaflet drying.{'\n'}
          2. <Text style={styles.boldText}>Tacunan Dwarf: </Text>
          A local variety that shows resilience to environmental stress and diseases affecting leaf health.{'\n'}
          3. <Text style={styles.boldText}>Baybay Tall: </Text>
          Adaptable variety with resistance to leaf diseases, suitable for various climates, including the Philippines. 
        </Text>
        },
      ],
    },
  };

  const selectedDisease = diseaseInfo[highestConfidenceClass];

  return (
    <ScrollView style={styles.container}>
      {selectedDisease ? (
        <>
          {selectedDisease.content.map((item, index) => (
            <Collapse style={styles.dropdownContainer} key={index}>
              <CollapseHeader>
                <View style={styles.header}>
                  {item.icon}
                  <View style={styles.textIconHeader}>
                    <Text style={styles.headerText}>{item.title}</Text>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.body}>
                  <Text>{item.content}</Text>
                </View>
              </CollapseBody>
            </Collapse>
          ))}
        </>
      ) : null}

      <View style={styles.botTextContainer}>
        <View style={styles.notSatisfiedTexts}>
          <Text>Not satisfied with the result? </Text>
          <Pressable
            onPress={() => navigation.navigate("Chat")}
          >
            <Text  style={styles.chatText}> Click here to chat with an expert now!</Text>
          </Pressable>
        </View>
        <View style={styles.clickHereTexts}>
          <Pressable
            onPress={() => navigation.navigate("Identification")}
          >
            <Text style={styles.clickText}>Click Here</Text>
          </Pressable>
          <Text> if you like to take another diagnosis.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    padding: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  textIconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
  body: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  clickHereTexts: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  clickText: {
    color: '#466626',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  notSatisfiedTexts: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',  
    width: '100%', 
    marginBottom: 10,
  },
  chatText: {
    color: '#466626',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  botTextContainer: {
    marginTop: 25,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default DiseaseInfoDropdown;
