import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  dataWrapper: {},
  imageWrapper: {
    alignItems: "center",
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  postsList: {
    marginTop: 24,
    maxHeight: "60%",
    minHeight: "60%",
    width: "100%",
  },
  commentBox: {
    marginBottom: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  commentTextWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    padding: 16,
    width: 300,
    flexGrow: 1,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    // fontSize: 13,
    color: "#212121",
    // fontWeight: 400,
    lineHeight: 18,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    // fontSize: 10,
    color: "#BDBDBD",
    // fontWeight: 400,
    lineHeight: 12,
    textAlign: "right",
  },

  commentAvatar: {
    borderRadius: "50%",
    width: 28,
    height: 28,
    backgroundColor: "#BDBDBD",
  },
  commentInputWrapper: {
    position: "relative",
    alignSelf: "flex-end",
    width: "100%",
    marginTop: 16,
  },
  commentInput: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 50,
    paddingTop: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    fontFamily: "Roboto-Medium",
    // fontSize: 16,
    color: "#BDBDBD",
    // fontWeight: 500,
    lineHeight: 19,
    textAlignVertical: "center",
  },
  addCommentBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: "50%",
    backgroundColor: "#FF6C00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessageBox: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessageStyle: {
    fontFamily: "Roboto-Medium",
    // fontSize: 16,
    color: "#212121",
    // fontWeight: 500,
    lineHeight: 19,
    textAlign: "center",
  },
});
