import { StyleSheet, Alert } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import Start from "./components/Start";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

// for connectivity check
import { useNetInfo } from "@react-native-community/netinfo";

const App = () => {
  // My web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDCvmuDSg5mhJxwlXW4w9m4oj3wtFAQ0yQ",
    authDomain: "chatty-f1f11.firebaseapp.com",
    projectId: "chatty-f1f11",
    storageBucket: "chatty-f1f11.appspot.com",
    messagingSenderId: "100044212953",
    appId: "1:100044212953:web:56365636b6cc0ba1e48cc8",
  };

  // Initialize Firebase & storage
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // get connection status
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              storage={storage}
              {...props}
              isConnected={connectionStatus.isConnected}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
