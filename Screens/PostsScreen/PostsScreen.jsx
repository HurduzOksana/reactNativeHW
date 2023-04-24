import React from "react";
import { View, Image, Text, SafeAreaView, Pressable } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { styles } from "./PostsScreen.styles";

const Posts = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <View style={styles.avatar}></View>
        <View>
          <Text style={styles.name}>Anonymous</Text>
          <Text style={styles.email}>Anonymous</Text>
        </View>
      </View>
      <View style={styles.postsList}>
        <SafeAreaView>
          <View style={styles.emptyMessageBox}>
            <Text style={styles.emptyMessageStyle}>Ще немає постів...</Text>
          </View>

          <View style={styles.postsListItem}>
            <Image style={styles.postImage} />
            <Text style={styles.postText}>Текст</Text>
            <View style={styles.postDataWrapper}>
              <Pressable>
                <View style={styles.postDataCommentsWrapper}>
                  <Icon name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={styles.postComments}>Post</Text>
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.postLocationWrapper}>
                  <Icon name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.postLocation}>Location</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Posts;
