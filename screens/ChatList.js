import React, {useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { List,Avatar,Divider,FAB,Portal,Dialog,Button,TextInput } from "react-native-paper";



const ChatList = () => {

    const [isDialogVisible, setDialogVisible] = useState(false);

    return(
        <View style={{flex:1}}>
            <List.Item 
                style={styles.container} title="Deniz Eren Mengüş" 
                description="Lorem Ipsum is simply dummy text." 
                descriptionStyle={{color:"#bcbcbc", padding:3, fontWeight:"100", fontSize:12}} 
                titleStyle={{fontSize:18, fontStyle:"italic", fontWeight:"bold", color:"white", padding:3}}
                    left={()=> <Avatar.Text 
                        label="DM" 
                        size={56}  
                        style={{backgroundColor:"#1f5aad", margin:5, marginLeft:1}}/>}
            />
            
            <Portal>
                <Dialog visible={isDialogVisible} onDismiss={()=> setDialogVisible(false)}>
                    <Dialog.Title>New Chat</Dialog.Title>
                    <Dialog.Content>
                        <TextInput label="Enter Room Code"></TextInput>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>setDialogVisible(false)}>Cancel</Button>
                        <Button>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <FAB 
                icon="plus" 
                style={{position: "absolute",bottom:16, right:16, backgroundColor:"#1f5aad"}}
                onPress={()=> setDialogVisible(true)}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        borderBottomColor:"#3d3d3d",
        borderBottomWidth:0.17,
        marginBottom:10,
        padding:10
    }
});


export default ChatList;