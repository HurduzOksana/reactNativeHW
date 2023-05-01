import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUid, getAvatar } from "../../redux/auth/authSelectors";
import {
  addComments,
  getComments,
} from "../../redux/dashboard/dashboardOperations";
import {
  View,
  Image,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { styles } from "./CommentsScreen.styles";

import { AntDesign } from "@expo/vector-icons";

const Comments = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUid);
  const userAvatar = useSelector(getAvatar);
  const [disabled, setDisabled] = useState(true);
  const { image, postId } = route.params;
  const [text, setText] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (postId && setComments) {
      dispatch(getComments({ postId: postId, setComments: setComments }));
    }
  }, [postId, setComments]);

  useEffect(() => {
    if (text) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [text]);

  const textHandler = (text) => {
    setText(text);
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const handlePublishComment = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const commentData = {
      timestamp: Date.now().toString(),
      text,
      userId: userId,
      postId: postId,
      date,
      time,
      avatar: userAvatar,
    };
    dispatch(addComments({ postId, commentData: commentData }));
    setText("");
    handleKeyboard();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView keyboardVerticalOffset={40} behavior="position">
        <TouchableWithoutFeedback onPress={handleKeyboard}>
          <View style={styles.imageWrapper}>
            <Image style={styles.postImage} source={{ uri: image }} />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.dataWrapper}>
          <SafeAreaView style={styles.postsList}>
            <FlatList
              ListEmptyComponent={() =>
                comments.length <= 0 ? (
                  <View style={styles.emptyMessageBox}>
                    <Text style={styles.emptyMessageStyle}>
                      No comments added yet...
                    </Text>
                  </View>
                ) : null
              }
              data={comments}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={handleKeyboard}>
                  <View
                    style={
                      item.userId === userId
                        ? styles.commentBox
                        : { ...styles.commentBox, flexDirection: "row-reverse" }
                    }
                  >
                    <View style={styles.commentTextWrapper}>
                      <Text style={styles.commentText}>{item.text}</Text>
                      <Text style={styles.commentDate}>
                        {item.date} | {item.time}
                      </Text>
                    </View>
                    <View style={styles.commentAvatar}>
                      {image ? (
                        <Image
                          style={styles.commentAvatar}
                          source={{ uri: item.avatar }}
                        />
                      ) : null}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.commentId}
            />
          </SafeAreaView>

          <View
            style={{
              ...styles.commentInputWrapper,
              paddingBottom: showKeyboard && Platform.OS == "android" ? 32 : 16,
            }}
          >
            <TextInput
              style={
                text
                  ? { ...styles.commentInput, color: "#212121" }
                  : styles.commentInput
              }
              value={text}
              multiline
              autoFocus={false}
              selectionColor="#FF6C00"
              blurOnSubmit={true}
              placeholderTextColor="#BDBDBD"
              onChangeText={textHandler}
              onFocus={() => {
                setShowKeyboard(true);
              }}
              onBlur={() => {
                setShowKeyboard(false);
              }}
              placeholder="Comment..."
            ></TextInput>
            <Pressable
              style={{ ...styles.addCommentBtn, opacity: disabled ? 0.5 : 1 }}
              onPress={handlePublishComment}
              disabled={disabled}
            >
              <AntDesign name="arrowup" size={20} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default Comments;
