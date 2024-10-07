import React, { useState } from 'react'; // Added useState here
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const NotificationSettingsScreen = ({ navigation }) => {
  const [isAnnouncementsEnabled, setIsAnnouncementsEnabled] = useState(true);
  const [isEventsEnabled, setIsEventsEnabled] = useState(true);
  const [isNewsProgramsEnabled, setIsNewsProgramsEnabled] = useState(true);
  const [isChatMessagesEnabled, setIsChatMessagesEnabled] = useState(true);

  const toggleAnnouncements = () => setIsAnnouncementsEnabled(previousState => !previousState);
  const toggleEvents = () => setIsEventsEnabled(previousState => !previousState);
  const toggleNewsPrograms = () => setIsNewsProgramsEnabled(previousState => !previousState);
  const toggleChatMessages = () => setIsChatMessagesEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>General Settings</Text>
        </View>
      </View>

      <Text style={styles.settingsTitle}>Notification Settings</Text>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle1}>UPDATES</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Announcements</Text>
          <TouchableOpacity 
            style={[styles.customSwitch, isAnnouncementsEnabled ? styles.switchOn : styles.switchOff]}
            onPress={toggleAnnouncements}
          >
            <View style={isAnnouncementsEnabled ? styles.thumbOn : styles.thumbOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Events</Text>
          <TouchableOpacity 
            style={[styles.customSwitch, isEventsEnabled ? styles.switchOn : styles.switchOff]}
            onPress={toggleEvents}
          >
            <View style={isEventsEnabled ? styles.thumbOn : styles.thumbOff} />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>News & Programs</Text>
          <TouchableOpacity 
            style={[styles.customSwitch, isNewsProgramsEnabled ? styles.switchOn : styles.switchOff]}
            onPress={toggleNewsPrograms}
          >
            <View style={isNewsProgramsEnabled ? styles.thumbOn : styles.thumbOff} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle2}>MESSAGES</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Chat Messages</Text>
          <TouchableOpacity 
            style={[styles.customSwitch, isChatMessagesEnabled ? styles.switchOn : styles.switchOff]}
            onPress={toggleChatMessages}
          >
            <View style={isChatMessagesEnabled ? styles.thumbOn : styles.thumbOff} />
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',    
    alignItems: 'center',     
    justifyContent: 'space-between', 
    paddingHorizontal: 20,    
    paddingVertical: 15,     
    position: 'relative',
    backgroundColor: 'gray',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 35,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  back: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  sectionTitle1: {
    fontSize: 12,
  },
  sectionTitle2: {
    fontSize: 12,
    marginTop: 25,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#E0E0E0',
  },
  itemText: {
    fontSize: 16,
  },
  customSwitch: {
    width: 40,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 5,
    borderWidth: .5,
  },
  switchOn: {
    backgroundColor: '#90B74B',
  },
  switchOff: {
    backgroundColor: 'white',
  },
  thumbOn: {
    width: 15,
    height: 15,
    borderRadius: 12.5,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  thumbOff: {
    width: 15,
    height: 15,
    borderRadius: 12.5,
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
  },
});

export default NotificationSettingsScreen;



// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";

// const NotificationSettingsScreen = ({ navigation }) => {
//   const [isAnnouncementsEnabled, setIsAnnouncementsEnabled] = useState(false);
//   const [isEventsEnabled, setIsEventsEnabled] = useState(false);
//   const [isNewsProgramsEnabled, setIsNewsProgramsEnabled] = useState(false);
//   const [isChatMessagesEnabled, setIsChatMessagesEnabled] = useState(false);

//   const toggleAnnouncements = () => setIsAnnouncementsEnabled(previousState => !previousState);
//   const toggleEvents = () => setIsEventsEnabled(previousState => !previousState);
//   const toggleNewsPrograms = () => setIsNewsProgramsEnabled(previousState => !previousState);
//   const toggleChatMessages = () => setIsChatMessagesEnabled(previousState => !previousState);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <View style={styles.titleContainer}>
//           <Text style={styles.headerTitle}>General Settings</Text>
//         </View>
//       </View>

//       <Text style={styles.header}>Notification Settings</Text>
//       <ScrollView style={styles.scrollContainer}>
//         {/* <Text style={styles.header}>Notification Settings</Text> */}
        
//         <Text style={styles.sectionTitle}>UPDATES</Text>
//         <View style={styles.item}>
//           <Text style={styles.itemText}>Announcements</Text>
//           <Switch
//             trackColor={{ false: '#767577', true: '#81b0ff' }}
//             thumbColor={isAnnouncementsEnabled ? '#f5dd4b' : '#f4f3f4'}
//             onValueChange={toggleAnnouncements}
//             value={isAnnouncementsEnabled}
//           />
//         </View>
//         <View style={styles.item}>
//           <Text style={styles.itemText}>Events</Text>
//           <Switch
//             trackColor={{ false: '#767577', true: '#81b0ff' }}
//             thumbColor={isEventsEnabled ? '#f5dd4b' : '#f4f3f4'}
//             onValueChange={toggleEvents}
//             value={isEventsEnabled}
//           />
//         </View>
//         <View style={styles.item}>
//           <Text style={styles.itemText}>News & Programs</Text>
//           <Switch
//             trackColor={{ false: '#767577', true: '#81b0ff' }}
//             thumbColor={isNewsProgramsEnabled ? '#f5dd4b' : '#f4f3f4'}
//             onValueChange={toggleNewsPrograms}
//             value={isNewsProgramsEnabled}
//           />
//         </View>
        
//         <Text style={styles.sectionTitle}>MESSAGES</Text>
//         <View style={styles.item}>
//           <Text style={styles.itemText}>Chat Messages</Text>
//           <Switch
//             trackColor={{ false: '#767577', true: '#81b0ff' }}
//             thumbColor={isChatMessagesEnabled ? '#f5dd4b' : '#f4f3f4'}
//             onValueChange={toggleChatMessages}
//             value={isChatMessagesEnabled}
//           />
//         </View>
        
//         <View style={styles.separator} />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     height: '100%',
//     flex: 1,
//   },
//   headerContainer: {
//     flexDirection: 'row',    
//     alignItems: 'center',     
//     justifyContent: 'space-between', 
//     paddingHorizontal: 20,    
//     paddingVertical: 15,     
//     position: 'relative',
//     backgroundColor: 'gray',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     textAlign: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     backgroundColor: '#F0F0F0',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     marginTop: 35,
//   },
//   titleContainer: {
//     flex: 1,          
//     alignItems: 'center', 
//     paddingVertical: 5,   
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center', 
//   },
//   back: {
//     fontSize: 18,
//     color: 'green',
//     marginBottom: 20,
//   },
//   scrollContainer: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   separator: {
//     marginVertical: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
// });

// export default NotificationSettingsScreen;
