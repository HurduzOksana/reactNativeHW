import { StyleSheet } from "react-native";
import * as Font from "expo-font";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    height: 50,
    color: "#212121",
    backgroundColor: "#E8E8E8",
  },
  form: {
    backgroundColor: "#FFFFFF",
    height: 489,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    top: 190,
  },
  formTitle: {
    marginBottom: 33,
    marginTop: 92,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  btnText: {
    color: "#FFFFFF",
  },
  btnLog: {
    backgroundColor: "transparent",
    height: 19,
    color: "#1B4371",
    alignItems: "center",
    justifyContent: "center",
  },
  btnLogText: {
    color: "#1B4371",
  },
  inputPasswordWrap: {
    position: "relative",
  },
  passwordShow: {
    position: "absolute",
    right: 16,
    padding: 16,
  },
  passwordShowText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
    textAlign: "right",
  },
});
