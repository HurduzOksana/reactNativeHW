import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./CreatePostsScreen.styles";
import Icon from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  View,
  Text,
  Image,
  Alert,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { getCity } from "../../service/geocode";
import { getUid } from "../../redux/auth/authSelectors";
import { addPost } from "../../redux/dashboard/dashboardOperations";

const CreatePost = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUid);

  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [getLocationPressed, setGetLocationPressed] = useState(false);
  const [place, setPlace] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [disableClear, setDisableClear] = useState(true);

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoTaken, setPhotoTaken] = useState(false);

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

  const resetForm = () => {
    setImage(null);
    setText("");
    setLocation({ latitude: "", longitude: "" });
    setGetLocationPressed(false);
    setPlace("");
  };

  const handlePublishPost = (e) => {
    e.preventDefault();

    if (!location.latitude || !location.longitude) {
      getLocation();
    }
    if (location.latitude && location.longitude) {
      const data = {
        userId: userId,
        comments: [],
        likes: 0,
        image,
        location: place.trim(),
        coordinates: { ...location },
        text: text.trim(),
      };
      dispatch(addPost(data));
      resetForm();
      navigation.navigate("Posts");
    }
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    resetForm();
    Alert.alert("Data deleted");
  };

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    })();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (text && place && image) {
      setDisabled(false);
    }
    if (!text || !place || !image) {
      setDisabled(true);
      setDisableClear(true);
    }
    if (text || place || image) {
      setDisableClear(false);
    }
  }, [text, place, image]);

  useEffect(() => {
    if (getLocationPressed && location.latitude && location.longitude) {
      const fetchData = async () => {
        const data = await getCity(location.latitude, location.longitude);
        console.log(data);
        setPlace(`${data.cityName}, ${data.country}`);
      };
      fetchData().catch(console.error);
    }
  }, [location.latitude, location.longitude, getLocationPressed]);

  if (hasPermission === false) {
    Alert.alert("No access to camera");
  }

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
            {hasPermission && !photoTaken && image ? (
              <View style={styles.addImage}>
                {image ? (
                  <Image style={styles.picture} source={{ uri: image }} />
                ) : null}
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
                    setImage(null);
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
            ) : hasPermission && !photoTaken && !image ? (
              <Camera
                style={styles.addImage}
                type={type}
                ref={(ref) => {
                  setCameraRef(ref);
                }}
              >
                <View style={styles.picture}>
                  {/* <Pressable
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
              Flip
            </Text>
          </Pressable> */}
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
              </Camera>
            ) : hasPermission && photoTaken ? (
              <View style={styles.addImage}>
                {image ? (
                  <Image style={styles.picture} source={{ uri: image }} />
                ) : null}
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
            ) : (
              <View style={styles.addImage}>
                {image ? (
                  <Image style={styles.picture} source={{ uri: image }} />
                ) : null}
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
            )}
            {image ? (
              <Pressable
                style={{ alignSelf: "flex-start" }}
                onPress={() => imageHandler(setImage)}
                accessibilityLabel={"Change picture"}
              >
                <Text style={styles.addImageText}>Change photo</Text>
              </Pressable>
            ) : (
              <Pressable
                style={{ alignSelf: "flex-start" }}
                onPress={() => imageHandler(setImage)}
                accessibilityLabel={"Add picture"}
              >
                <Text style={styles.addImageText}>Add photo</Text>
              </Pressable>
            )}

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
              <Pressable
                onPress={() => {
                  setGetLocationPressed(true);
                  getLocation();
                }}
              >
                <Icon name="map-pin" size={24} color="#BDBDBD" />
              </Pressable>
              <TextInput
                value={place}
                selectionColor="#FF6C00"
                r
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
              onPress={handlePublishPost}
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
              onPress={handleDeletePost}
              accessibilityLabel={"Delete post"}
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
