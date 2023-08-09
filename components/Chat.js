import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  addDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, selectedColor, uid } = route.params;
  const [messages, setMessages] = useState([]);

  const addMessageToFirebase = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubChatty = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      if (unsubChatty) unsubChatty();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => {
          addMessageToFirebase(messages);
        }}
        user={{ _id: uid, name }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
});

export default Chat;
