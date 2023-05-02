import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvatar, getEmail, getUid } from "../../redux/auth/authSelectors";
import {
  addLike,
  getUsersPosts,
  removeLike,
} from "../../redux/dashboard/dashboardOperations";
import { signOut } from "../../redux/auth/authOperations";
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
  const dispatch = useDispatch();
  const userId = useSelector(getUid);
  const image = useSelector(getAvatar);
  const name = useSelector(getEmail);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (setPosts) {
      dispatch(getUsersPosts({ userId: userId, setUsersPosts: setPosts }));
    }
  }, [setPosts]);

  const handleLogout = () => {
    dispatch(signOut());
  };

  const handleLike = (postId, liked) => {
    if (!liked) {
      dispatch(addLike({ postId: postId }));
    }
    if (liked) {
      dispatch(removeLike({ postId: postId }));
    }
  };

  const handleLocation = (coordinates, text, location) => {
    navigation.navigate("Map", { coordinates, text, location });
  };

  const handleComment = (image, comments, postId) => {
    navigation.navigate("Comment", { image, comments, postId });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/photo-bg.png")}
      >
        <View style={styles.contentBox}>
          <View style={styles.avatarWrapper}>
            {image ? (
              <Image style={styles.avatar} source={{ uri: image }} />
            ) : null}
          </View>
          <Text style={styles.title}>{name ? name : "User"}</Text>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Icon name="log-out" size={24} color="#BDBDBD" />
          </Pressable>

          {posts && posts.length > 0 && (
            <SafeAreaView style={styles.postsList}>
              <FlatList
                ListEmptyComponent={() =>
                  posts.length <= 0 ? (
                    <View style={styles.emptyMessageBox}>
                      <Text style={styles.emptyMessageStyle}>
                        Ще немає постів...
                      </Text>
                    </View>
                  ) : null
                }
                data={posts}
                renderItem={({ item }) => (
                  <View style={styles.postsListItem}>
                    <Image
                      style={styles.postImage}
                      source={{ uri: item.image }}
                    />
                    <Text style={styles.postText}>{item.text}</Text>
                    <View style={styles.postDataWrapper}>
                      <View style={styles.postDataAchievesWrapper}>
                        <Pressable
                          onPress={() => {
                            handleComment(
                              item.image,
                              item.comments,
                              item.postId
                            );
                          }}
                        >
                          <View style={styles.postDataCommentsWrapper}>
                            <Icon
                              name="message-circle"
                              size={24}
                              color={
                                item.comments.length > 0 ? "#FF6C00" : "#BDBDBD"
                              }
                            />
                            <Text style={styles.postComments}>
                              {item.comments.length ?? item.comments.length}
                            </Text>
                          </View>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            handleLike(item.postId, item.liked);
                          }}
                        >
                          <View style={styles.postDataCommentsWrapper}>
                            <Icon
                              name="thumbs-up"
                              size={24}
                              color={item.liked ? "#FF6C00" : "#BDBDBD"}
                            />
                            <Text style={styles.postComments}>
                              {item.likes ? item.likes : 0}
                            </Text>
                          </View>
                        </Pressable>
                      </View>
                      <Pressable
                        onPress={() => {
                          handleLocation(
                            item.coordinates,
                            item.text,
                            item.location
                          );
                        }}
                      >
                        <View style={styles.postLocationWrapper}>
                          <Icon name="map-pin" size={24} color="#BDBDBD" />
                          <Text style={styles.postLocation}>
                            {`${item.location}`.split(",")[0]}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.postId}
              />
            </SafeAreaView>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;
