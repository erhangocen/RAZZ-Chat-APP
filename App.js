import React, {useEffect} from "react"
import { Text  } from "react-native"
import { NavigationContainer, DefaultTheme, useNavigation  } from "@react-navigation/native"
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
import {Provider} from "react-native-paper"


const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#101010',
    card: 'rgb(255, 255, 255)',
    text: 'white',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const LightTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'white',
    card: 'rgb(255, 255, 255)',
    text: 'black',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

let Theme = 2;
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {

  const navigation = useNavigation()
  useEffect(()=> {

    const isLoggedIn = false;
    if(!isLoggedIn){
      navigation.navigate("Signup");
    }
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
          tabBarActiveTintColor: '#1f5aad',
          tabBarInactiveTintColor: 'gray',
          tabBarBadgeStyle : {height:15, width:2, fontSize:10 },
          tabBarIconStyle: {margin:0, padding:0},
          tabBarStyle: {height:50, backgroundColor:Theme == 1 ? "#111111" : "white" , borderTopColor:Theme == 1 ? "#111111" : "white" },
          headerStyle: {backgroundColor: Theme == 1 ? "#111111" : "white"}
          
        })}
  >
    <Tabs.Screen name="Chats" component={ChatList} options={{ tabBarBadge: 55, headerTitle:"RAZZ", headerTitleStyle:{color:"white", } }}/>
    <Tabs.Screen name="Profile" component={Profile}/>
  </Tabs.Navigator>
  )
}

const App = () => {
  return(
    <NavigationContainer theme={Theme == 1 ? DarkTheme : LightTheme}>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={TabsNavigator}  options={{headerShown:false}}/>
          <Stack.Screen name="Chat" component={Chat}/>
          <Stack.Screen name="Signup" component={Signup} options={{presentation:"fullScreenModal"}} />
          <Stack.Screen name="Login" component={Login} options={{presentation:"fullScreenModal"}} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default App;