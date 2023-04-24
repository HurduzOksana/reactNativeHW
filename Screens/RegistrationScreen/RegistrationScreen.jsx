import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./RegistrationScreen.styles";

export default function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [focused, setFocused] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);

  const loginHandler = (text) => {
    setLogin(text);
  };

  const emailHandler = (text) => {
    setEmail(text);
  };

  const passwordHandler = (text) => {
    setPassword(text.trim());
  };

  const resetForm = () => {
    setLogin("");
    setEmail("");
    setPassword("");
    setAvatar(null);
  };

  const addAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }
    setAvatar(result.assets[0].uri);
  };

  const handleInputShow = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const handleSubmit = () => {
    console.log("Form data:", state);
    setState({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/photo-bg.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                paddingBottom:
                  showKeyboard && Platform.OS == "android" ? 32 : 111,
              }}
            >
              <View style={styles.addAvatar}>
                {avatar ? (
                  <Image style={styles.avatar} source={{ uri: avatar }} />
                ) : null}
                <Image
                  style={styles.addIcon}
                  source={require("../../assets/add.png")}
                  onPress={() => addAvatar(setImage)}
                />
              </View>
              <View style={styles.formTitle}>
                <Text style={styles.text}>Реєстрація</Text>
              </View>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: focused === "login" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Логін"
                value={login}
                onChangeText={loginHandler}
                onFocus={() => {
                  setShowKeyboard(true);
                  setFocused("login");
                }}
                onBlur={() => {
                  setFocused("");
                }}
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: focused === "email" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={emailHandler}
                onFocus={() => {
                  setShowKeyboard(true);
                  setFocused("email");
                }}
                onBlur={() => {
                  setFocused("");
                }}
              />
              <View style={styles.inputPasswordWrap}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: focused === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                  secureTextEntry={!showPassword}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={passwordHandler}
                  onFocus={() => {
                    setShowKeyboard(true);
                    setFocused("password");
                  }}
                  onBlur={() => {
                    setFocused("");
                  }}
                />
                <Pressable
                  onPress={handleInputShow}
                  style={styles.passwordShow}
                >
                  <Text style={styles.passwordShowText}>
                    {showPassword ? "Приховати" : "Показати"}
                  </Text>
                </Pressable>
              </View>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnLog}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.btnLogText}>Вже є аккаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
