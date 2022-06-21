import React, {useState} from "react";
import { Alert, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Pressable, View, StyleSheet } from "react-native";
import { Button, SocialIcon } from "react-native-paper";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../firebase'
import { useNavigation } from "@react-navigation/core";
import firebase from "firebase/app";


const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation()

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
            />

            <TextInput 
              placeholder="Password" 
              value={password}
              onChangeText={(text)=> setPassword(text)}
              placeholderColor="#c4c3cb" 
              style={styles.loginFormTextInput} 
              secureTextEntry={true} 
            />
            <View 
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16
              }}
            >
            
            <Button style={styles.fbLoginButton} type='clear' mode="outlined" color="#C20000" compact>Log In</Button>
            <Button style={styles.loginButton} loading={isLoading} mode="contained" onPress={() => createAccount()} >Sign Up</Button>
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
    color:"#900000",
    backfaceVisibility:"hidden"
  },
  loginFormView: {
    borderWidth: 1,
    borderRadius:20,
    borderColor: "rgba(255, 0, 0,0.2)",
    position:"relative",
    top:"21%",
    padding:20
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#FDF8F8",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    width:280
  },
  loginButton: {
    backgroundColor:"#900000"
  },
  fbLoginButton: {
    borderColor:"#C20000"
  },
});


export default Signup;


