import { useNavigation, useRoute } from "@react-navigation/native";
import React, {useEffect, useState, useLayoutEffect, useCallback} from "react";
import { Text, View, TouchableOpacity } from "react-native";
import firebase from 'firebase/compat/app'
import { GiftedChat, InputToolbar} from "react-native-gifted-chat";
import { Header } from "react-native/Libraries/NewAppScreen";
import {collection, addDoc, orderBy, query, onSnapshot} from "firebase/firestore"
import {AntDesign} from "@expo/vector-icons"
import { getAuth } from "firebase/auth";


const Chat = () => {

    const route = useRoute();
    const [messages, setMessages] = useState([]);
    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    
    useEffect(() => {
        return firebase.auth().onAuthStateChanged((user)=>{
            setName(user?.displayName)
            setUid(user?.uid);
        });
    }, []);

    useEffect(() => {
        firebase.firestore().doc("chats/"+ route.params.chatId).onSnapshot((snapshot) => {
            setMessages(snapshot.data()?.messages ?? []);
        })
    }, [route.params.chatId]);
    

    const onSend = (m=[]) =>{
        firebase.firestore().doc("chats/" + route.params.chatId).set({    
            messages:GiftedChat.append(messages,m)
        },
        {merge:true}
        );
        console.warn(route.params.chatId)
    };

    return(
    <View style={{flex:1, backgroundColor:"white"}}>
        <GiftedChat 
            messages={messages.map(x=> ({...x, createdAt:x?.createdAt?.toDate()}))} 
            onSend={messages => onSend(messages)}
            user={{
                _id: uid,
                name : name,
            }}
        />
    </View>
        
    )
}

export default Chat;