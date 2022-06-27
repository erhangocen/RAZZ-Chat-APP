import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { List,Avatar,Divider,FAB,Portal,Dialog,Button,TextInput } from "react-native-paper";
import firebase from "firebase/compat/app";
import { async } from "@firebase/util";
import { useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";


const ChatList = () => {

    const [isDialogVisible, setIsDialogVisible] = useState(false);
    
    const [email, setEmail] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [chats,setChats] = useState([]);

    const[isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(()=>{
        return firebase.auth().onAuthStateChanged(user=>{
            setEmail(user?.email ?? "")
        })
    },[]);

    useEffect(()=>{
        firebase.firestore().collection("chat").where("users", "array-contains", email).onSnapshot((querySnapshot)=>{
            setChats(querySnapshot.docs);
        })
    }, [email]);

    const createChat = async () => {
        if(!email || !userEmail) return;
        setIsLoading(true);
        const response = await firebase.firestore().collection("chat").add({
            users: [email,userEmail]
        });
        setIsLoading(false);
        setIsDialogVisible(false);
        navigation.navigate("Chat", {chatId: response.id});
    }

    return(
        <View style={{flex:1, backgroundColor:"black"}}>
            {chats.map(chat=>(
            
                <React.Fragment>
                    <List.Item 
                        style={styles.container} 
                        title={chat.data().users.find((x)=> x !== email)}
                        description={(chat.data().messages ?? [])[0]?.text ?? undefined} 
                        descriptionStyle={{padding:3, fontWeight:"100", fontSize:12}} 
                        titleStyle={{fontSize:18, fontStyle:"italic", fontWeight:"bold", padding:3}}
                        onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
                            left={()=> 
                                <Avatar.Text 
                                    label={chat
                                            .data()
                                            .users.find((x) => x !== email)
                                            .split(" ")
                                            .reduce((prev, current) => prev + current[0], "")}
                                    size={56}  
                                    labelStyle={{fontSize:33}}
                                    style={{margin:5, marginLeft:1}}/>}
                    />
                    <Divider inset />
                </React.Fragment>
            ))}             
            <Portal>
                <Dialog visible={isDialogVisible} onDismiss={()=> setIsDialogVisible(false)}>
                    <Dialog.Title>New Chat</Dialog.Title>
                    <Dialog.Content>
                        <TextInput value={userEmail} onChangeText={text => setUserEmail(text)} label="Enter An Email"></TextInput>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>setIsDialogVisible(false)}>Cancel</Button>
                        <Button onPress={()=> createChat()} loading={isLoading}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <FAB 
                icon="plus" 
                style={{position: "absolute",bottom:16, right:16}}
                onPress={()=> setIsDialogVisible(true)}
            />

            <FAB 
                icon="bird" 
                style={{position: "absolute",bottom:86, right:16}}
                onPress={() => navigation.navigate("Chat", { chatId: "PBcaggZ4NPPSGYbybzc1"
            })}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{

        padding:15
    }
});


export default ChatList;