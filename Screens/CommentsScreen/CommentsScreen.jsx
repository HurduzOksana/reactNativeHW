import React from "react";
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
  const { image, postId } = route.params;
  const [text, setText] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [comments, setComments] = useState([]);

  const textHandler = (text) => {
    setText(text);
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
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
            <View style={styles.emptyMessageBox}>
              <Text style={styles.emptyMessageStyle}>
                Ще немає комментарів...
              </Text>
            </View>

            <TouchableWithoutFeedback onPress={handleKeyboard}>
              <View
                style={
                  item.userId === userId
                    ? styles.commentBox
                    : { ...styles.commentBox, flexDirection: "row-reverse" }
                }
              >
                <View style={styles.commentTextWrapper}>
                  <Text style={styles.commentText}>Текст</Text>
                  <Text style={styles.commentDate}>Дата | Час</Text>
                </View>
                <View style={styles.commentAvatar}>
                  <Image
                    style={styles.commentAvatar}
                    source={{ uri: item.avatar }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
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
