import React, { useState } from "react";
import { styles } from "./CreatePostsScreen.styles";
import Icon from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  View,
  Text,
  Image,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";

const CreatePost = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [place, setPlace] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disableClear, setDisableClear] = useState(true);

  const textHandler = (text) => {
    setText(text);
  };
  const locationHandler = (text) => {
    setPlace(text);
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
          <View
            style={{
              ...styles.addPostForm,
              paddingBottom:
                showKeyboard && Platform.OS == "android" ? 32 : 270,
            }}
          >
            <View style={styles.addImage}>
              <Image style={styles.picture} source={{ uri: image }} />

              <Pressable
                style={
                  image
                    ? {
                        ...styles.addImageBtn,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }
                    : styles.addImageBtn
                }
              >
                <FontAwesome5
                  name="camera"
                  size={20}
                  color={image ? "#FFFFFF" : "#BDBDBD"}
                  style={styles.addImageBtnIcon}
                />
              </Pressable>
            </View>

            <View style={styles.picture}>
              <Pressable
                style={styles.addImageBtn}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                    setImage(uri);
                    setPhotoTaken(true);
                  }
                }}
              >
                <FontAwesome5
                  name="camera"
                  size={20}
                  color={image ? "#FFFFFF" : "#BDBDBD"}
                  style={styles.addImageBtnIcon}
                />
              </Pressable>
            </View>

            <View style={styles.addImage}>
              <Image style={styles.picture} source={{ uri: image }} />

              <Pressable
                style={
                  image
                    ? {
                        ...styles.addImageBtn,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }
                    : styles.addImageBtn
                }
                onPress={() => {
                  setPhotoTaken(false);
                }}
                accessibilityLabel={"Add picture"}
              >
                <FontAwesome5
                  name="camera"
                  size={20}
                  color={image ? "#FFFFFF" : "#BDBDBD"}
                  style={styles.addImageBtnIcon}
                />
              </Pressable>
            </View>

            <View style={styles.addImage}>
              <Image style={styles.picture} source={{ uri: image }} />

              <Pressable
                style={
                  image
                    ? {
                        ...styles.addImageBtn,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }
                    : styles.addImageBtn
                }
                onPress={() => imageHandler(setImage)}
                accessibilityLabel={"Add picture"}
              >
                <FontAwesome5
                  name="camera"
                  size={20}
                  color={image ? "#FFFFFF" : "#BDBDBD"}
                  style={styles.addImageBtnIcon}
                />
              </Pressable>
            </View>

            <Pressable
              style={{ alignSelf: "flex-start" }}
              onPress={() => imageHandler(setImage)}
              accessibilityLabel={"Change picture"}
            >
              <Text style={styles.addImageText}>Change photo</Text>
            </Pressable>

            <Pressable
              style={{ alignSelf: "flex-start" }}
              onPress={() => imageHandler(setImage)}
              accessibilityLabel={"Add picture"}
            >
              <Text style={styles.addImageText}>Add photo</Text>
            </Pressable>

            <View style={styles.inputWrapper}>
              <TextInput
                value={text}
                selectionColor="#FF6C00"
                onChangeText={textHandler}
                onFocus={() => {
                  setShowKeyboard(true);
                }}
                placeholder="Description..."
                style={
                  text
                    ? styles.input
                    : { ...styles.input, fontFamily: "Roboto-Regular" }
                }
              />
            </View>
            <View style={styles.inputWrapper}>
              <Pressable>
                <Icon name="map-pin" size={24} color="#BDBDBD" />
              </Pressable>
              <TextInput
                value={place}
                selectionColor="#FF6C00"
                onChangeText={locationHandler}
                onFocus={() => {
                  setShowKeyboard(true);
                }}
                placeholder="Location..."
                style={{ ...styles.input, fontFamily: "Roboto-Regular" }}
              />
            </View>
            <Pressable
              disabled={disabled}
              style={
                disabled
                  ? { ...styles.addPostBtn, backgroundColor: "#F6F6F6" }
                  : styles.addPostBtn
              }
              accessibilityLabel={"Publish post"}
            >
              <Text
                style={
                  disabled
                    ? { ...styles.addPostBtnText, color: "#BDBDBD" }
                    : styles.addPostBtnText
                }
              >
                Publish
              </Text>
            </Pressable>

            <Pressable
              disabled={disableClear}
              style={
                disableClear
                  ? { ...styles.removePostBtn, backgroundColor: "#F6F6F6" }
                  : styles.removePostBtn
              }
            >
              <Icon
                name="trash-2"
                size={24}
                color={disableClear ? "#BDBDBD" : "#ffffff"}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePost;
