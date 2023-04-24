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
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    top: 160,
  },
  formTitle: {
    marginBottom: 33,
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
  addAvatar: {
    position: "relative",
    alignSelf: "center",
    marginTop: -60,
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatar: {
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    bottom: 14,
    right: -9,
    borderRadius: 50,
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
