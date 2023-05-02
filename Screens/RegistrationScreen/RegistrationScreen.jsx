import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import { styles } from "./RegistrationScreen.styles";
import { signUp } from "../../redux/auth/authOperations";
import Icon from "@expo/vector-icons/Feather";
import { imagePicker } from "../../utils/imagePicker";

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [focused, setFocused] = useState("");

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
    setImage(null);
  };

  const onRegister = (e) => {
    e.preventDefault();

    const user = {
      login: login.trim(),
      email: email.trim(),
      password,
      image,
    };

    dispatch(signUp(user));
    resetForm();
  };

  const handleInputShow = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  useEffect(() => {
    if (email && password && login) {
      setDisabled(false);
    }
    if (!email || !password || !login) {
      setDisabled(true);
    }
  }, [email, password, login]);

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
                {image ? (
                  <Image style={styles.avatar} source={{ uri: image }} />
                ) : null}
                <Pressable
                  style={styles.addIcon}
                  onPress={() => imagePicker(setImage)}
                >
                  {image ? (
                    <View style={styles.removeImageBtnImage}>
                      <Icon name="plus" size={25} color="#BDBDBD" />
                    </View>
                  ) : (
                    <View style={styles.addImageBtnImage}>
                      <Icon name="plus" size={25} color="#FF6C00" />
                    </View>
                  )}
                </Pressable>
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
              <TouchableOpacity
                style={styles.btn}
                disabled={disabled}
                onPress={onRegister}
                accessibilityLabel={"Register"}
              >
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
