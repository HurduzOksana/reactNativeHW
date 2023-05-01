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
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { styles } from "./LoginScreen.styles";
import { signIn } from "../../redux/auth/authOperations";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [focused, setFocused] = useState("");

  // const [state, setState] = useState(initialState);

  // const initialState = {
  //   email: "",
  //   password: "",
  // };

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

  const onLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email.trim(),
      password,
    };
    dispatch(signIn(user));
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
    if (email && password) {
      setDisabled(false);
    }
    if (!email || !password) {
      setDisabled(true);
    }
  }, [email, password]);

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
              <View style={styles.formTitle}>
                <Text style={styles.text}>Увійти</Text>
              </View>
              <TextInput
                returnKeyType="next"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                selectionColor="#FF6C00"
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
                disabled={disabled}
                style={styles.btn}
                onPress={onLogin}
                accessibilityLabel={"Login"}
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
