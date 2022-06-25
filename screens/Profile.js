import React, {useEffect, useState} from "react";
import { Text, View } from "react-native";
import { Avatar, Title, Subheading, Button } from "react-native-paper";
import firebase from "firebase/compat/app"

const Profile = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user => {
            setName(user?.displayName ?? "")
            setEmail(user?.email ?? "")
        })
    },[])

    return(
        <View style={{alignItems:"center", margin:10, padding:25}}>
            <Avatar.Text label={name.split(" ").reduce((prev, current) => prev + current[0], "")}/>
            <Title style={{padding:5, marginTop:10}}>{name}</Title>
            <Subheading style={{padding:5}}>{email}</Subheading>
            <Subheading style={{padding:5}}> +90 538 401 45 80 </Subheading>
            <Button onPress={()=> firebase.auth().signOut()}> Sign Out </Button>
        </View>
    )
}

export default Profile;