import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  addDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
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
            backgroundColor: selectedColor,
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const cacheTexts = async (textToCache) => {
    try {
      await AsyncStorage.setItem("texts_cache", JSON.stringify(textToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedTexts = async () => {
    const cachedTexts = (await AsyncStorage.getItem("texts_cache")) || [];
    setMessages(JSON.parse(cachedTexts));
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={uid} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;

    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
  };

  let unsubChatty;
  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when use effect code is re-executed.
      if (unsubChatty) unsubChatty();
      unsubChatty = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubChatty = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheTexts(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedTexts();

    // Clean up code
    return () => {
      if (unsubChatty) unsubChatty();
    };
  }, [isConnected]);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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
