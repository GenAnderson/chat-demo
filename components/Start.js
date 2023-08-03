import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";

import { useState } from "react";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("backgroundColor.a");

  const backgroundColor = {
    a: "#090C08",
    b: "#474056",
    c: "#8A95A5",
    d: "#B9C6AE",
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../backgroundimage.png")}
        style={[styles.backgroundImage, styles.container]}
      >
        <Text style={styles.title}>Chatty</Text>

        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          ></TextInput>

          <View style={styles.colorSectionMain}>
            <Text>Choose Background Color</Text>
            <View style={[styles.colorSection]}>
              <TouchableOpacity
                style={[
                  styles.circle,
                  selectedColor === backgroundColor.a &&
                    styles.borderSelectedCircle,
                  { backgroundColor: backgroundColor.a },
                ]}
                onPress={() => setSelectedColor(backgroundColor.a)}
              />
              <TouchableOpacity
                style={[
                  styles.circle,
                  selectedColor === backgroundColor.a &&
                    styles.borderSelectedCircle,
                  { backgroundColor: backgroundColor.a },
                ]}
                onPress={() => setSelectedColor(backgroundColor.a)}
              />
              <TouchableOpacity
                style={[
                  styles.circle,
                  selectedColor === backgroundColor.a &&
                    styles.borderSelectedCircle,
                  { backgroundColor: backgroundColor.a },
                ]}
                onPress={() => setSelectedColor(backgroundColor.a)}
              />
              <TouchableOpacity
                style={[
                  styles.circle,
                  selectedColor === backgroundColor.a &&
                    styles.borderSelectedCircle,
                  { backgroundColor: backgroundColor.a },
                ]}
                onPress={() => setSelectedColor(backgroundColor.a)}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Chat", {
                name: name,
                selectedColor: selectedColor,
              });
            }}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
  },
  title: {
    marginTop: 50,

    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  textContainer: {
    marginBottom: 50,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "88%",
    height: "44%",
    backgroundColor: "#FFFFFF",
  },

  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,

    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  colorSectionMain: {
    width: "88%",
    alignItems: "left",
  },
  colorSection: {
    flexDirection: "row",
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    margin: 10,
  },

  borderSelectedCircle: {
    borderWidth: 2,
    borderColor: "#090C08",
  },

  button: {
    width: "88%",
    padding: 15,
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#757083",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default Start;
