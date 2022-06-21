import React from "react";
import { Text, View } from "react-native";
import { Avatar, Title, Subheading, Button } from "react-native-paper";

const Profile = () => {
    return(
        <View style={{alignItems:"center", margin:10, padding:25}}>
            <Avatar.Text label="EG"/>
            <Title style={{color:"white", padding:5, marginTop:10}}> Erhan Göcen </Title>
            <Subheading style={{color:"white", padding:5}}> user@user.com </Subheading>
            <Subheading style={{color:"white", padding:5}}> +90 538 401 45 80 </Subheading>
            <Button> Sign Out </Button>
        </View>
    )
}

export default Profile;