import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userData: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#E8E8E8",
  },

  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "#212121",
    fontWeight: 700,
    lineHeight: 15,
    textAlign: "center",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "#212121",
    fontWeight: 400,
    lineHeight: 13,
    textAlign: "center",
  },
  postsList: {
    width: "100%",
    marginTop: 32,
    paddingBottom: 50,
  },
  postsListItem: {
    marginBottom: 32,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  postText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    fontWeight: 500,
    lineHeight: 19,
  },
  postDataWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postDataCommentsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  postComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    fontWeight: 400,
    lineHeight: 19,
  },
  postLocationWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  postLocation: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    fontWeight: 400,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
