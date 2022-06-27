import React, {Component, useState} from "react";
import {Keyboard, KeyboardAvoidingView, Text,  TouchableWithoutFeedback, View, StyleSheet, BackHandler } from "react-native";
import { Button, SocialIcon, TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../firebase'
import { useNavigation } from "@react-navigation/core";
import firebase from "firebase/compat/app";
import {useBackHandler} from "@react-native-community/hooks"
import {Ionicons} from '@expo/vector-icons';

const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation()

  useBackHandler(()=> true)

  const createAccount = async () => {

    setIsLoading(true);

        

    try{
      const response = await createUserWithEmailAndPassword(auth,email,password);
      await updateProfile(response.user, {displayName: name})

      

      navigation.popToTop();
    }
    catch(e){
      setIsLoading(false)
      alert(e.message)
    }
  }

  console.warn(firebase.firestore().collection("chat/lpsysmlUhYlONdNFSVSW").doc())

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>JOIN RAZZ</Text>

            <TextInput 
              placeholder="Username" 
              value={name} 
              onChangeText={(text) => setName(text)}
              placeholderColor="#c4c3cb" 
              style={styles.loginFormTextInput} 
            />

            <TextInput 
              placeholder="Email" 
              value={email}
              onChangeText={(text)=> setEmail(text)}
              placeholderColor="#c4c3cb" 
              style={styles.loginFormTextInput} 
              keyboardType = "email-address"
            />

            <TextInput 
              placeholder="Password" 
              value={password}
              onChangeText={(text)=> setPassword(text)}
              placeholderColor="#c4c3cb" 
              secureTextEntry={true} 
              style={styles.loginFormTextInput} 
            />

            
            <View 
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16
              }}
            >
            
            <Button style={styles.loginButton} onPress={()=>navigation.navigate("Login")} type='clear' mode="outlined" color="#2C2C2C" compact>Log In</Button>
            <Button style={styles.signUpButton} loading={isLoading} mode="contained" onPress={() => createAccount()} >Sign Up</Button>
            </View>
            
          </View>
        </View>
        
      </TouchableWithoutFeedback>
      
    </KeyboardAvoidingView>   
    
  );
}


const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 30,
    textAlign: "center",
    color:"#212121",
    backfaceVisibility:"hidden"
  },
  loginFormView: {
    borderWidth: 1,
    borderRadius:20,
    borderColor: "rgba(128, 128, 128,0.2)",
    position:"relative",
    top:"21%",
    padding:20
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderWidth:1,
    borderColor:"rgba(128, 128, 128,0.4)",
    borderBottomWidth:0,
    borderRadius:5,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    width:280
  },
  signUpButton: {
    backgroundColor:"#2C2C2C"
  },
  loginButton: {
    borderColor:"#2C2C2C"
  },
});


export default Signup;


