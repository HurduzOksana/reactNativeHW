import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./LoginScreen.styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  const [state, setState] = useState(initialState);

  const initialState = {
    email: "",
    password: "",
  };

  const emailHandler = (text) => {
    setEmail(text);
  };

  const passwordHandler = (text) => {
    setPassword(text.trim());
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleInputShow = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const handleSubmit = () => {
    console.log("Form Data:", state);
    setState({
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
                  showKeyboard && Platform.OS == "android" ? 16 : 144,
              }}
            >
              <View style={styles.formTitle}>
                <Text style={styles.text}>Увійти</Text>
              </View>
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
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnLog}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.btnLogText}>
                  Немає аккаунта? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
