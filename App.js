import React, {useEffect} from "react"
import { Text, StyleSheet  } from "react-native"
import { NavigationContainer, useNavigation  } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Chat from "./screens/Chat"
import ChatList from "./screens/ChatList"
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Profile from "./screens/Profile"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Ionicons} from '@expo/vector-icons';
import { setStatusBarBackgroundColor } from "expo-status-bar"
import { Header } from "react-native/Libraries/NewAppScreen"
import {Provider, DefaultTheme, DarkTheme} from "react-native-paper"
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import "firebase/auth";
import "firebase/firestore";
import { View } from "react-native-web"
import {name} from "./screens/Chat"



const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {

  const navigation = useNavigation()
  useEffect(()=> {

    firebase.auth().onAuthStateChanged((user)=> {
        if(!user){
        navigation.navigate("Signup");
      }
    })
  }, [])

  return(
    <Tabs.Navigator
      screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Chats') {
                iconName = focused
                  ? 'chatbubbles'
                  : 'chatbubbles-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            
            tabBarInactiveTintColor: 'gray',
            tabBarBadgeStyle : {height:15, width:2, fontSize:10 },
            tabBarIconStyle: {margin:0, padding:0},
            tabBarStyle: {height:50, backgroundColor:"black", borderTopWidth:0},
            headerTitle:"RAZZ",
            headerStyle:{backgroundColor:"black"},
            headerTitleStyle:{color:"white", fontWeight:"bold"},    
            tabBarActiveTintColor:"#0937E2"
          })}
  >
    <Tabs.Screen name="Chats" component={ChatList} options={{ tabBarBadge: 55}}/>
    <Tabs.Screen name="Profile" component={Profile}/>
  </Tabs.Navigator>
  )
}

const lightTheme = {
  ...DefaultTheme,
      roundness: 2,
      colors: {
        ...DefaultTheme.colors,
        primary: "#1A1A1A",
        accent: "#FAFAFA"
      },
};

const darkTheme = {
  ...DarkTheme,
      roundness: 2,
      colors: {
        ...DarkTheme.colors,
        primary: "#D6DDD4",
        accent: "#0937E2"
      },
};

var theme = true;

const App = () => {
  return(
      <NavigationContainer>
      <Provider theme={theme ? darkTheme : lightTheme} >
        <Stack.Navigator styles={styles.app}>
          <Stack.Screen 
            name="Main" 
            component={TabsNavigator}  
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="Chat" 
            component={Chat}
          />
          <Stack.Screen 
            name="Signup" 
            component={Signup} 
            options={{presentation: "fullScreenModal", headerBackVisible:false }}
          />
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ presentation: "fullScreenModal" }} 
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'black'
  },

});

export default App;