import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";

import { styles } from "./ProfileScreen.styles";

const Profile = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/photo-bg.png")}
      >
        <View style={styles.contentBox}>
          <View style={styles.avatarWrapper}>
            <Image style={styles.avatar} />
          </View>
          <Text style={styles.title}>Anonim</Text>
          <Pressable style={styles.logoutBtn}>
            <Icon name="log-out" size={24} color="#BDBDBD" />
          </Pressable>
          <SafeAreaView style={styles.postsList}>
            <View style={styles.emptyMessageBox}>
              <Text style={styles.emptyMessageStyle}>Ще немає дописів...</Text>
            </View>

            <View style={styles.postsListItem}>
              <Image style={styles.postImage} />
              <Text style={styles.postText}>Текст</Text>
              <View style={styles.postDataWrapper}>
                <View style={styles.postDataAchievesWrapper}>
                  <Pressable>
                    <View style={styles.postDataCommentsWrapper}>
                      <Icon name="message-circle" size={24} color={"#FF6C00"} />
                      <Text style={styles.postComments}>Комментар</Text>
                    </View>
                  </Pressable>
                  <Pressable>
                    <View style={styles.postDataCommentsWrapper}>
                      <Icon name="thumbs-up" size={24} color={"#BDBDBD"} />
                      <Text style={styles.postComments}>Вдодобання</Text>
                    </View>
                  </Pressable>
                </View>
                <Pressable>
                  <View style={styles.postLocationWrapper}>
                    <Icon name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.postLocation}>Локація</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;
