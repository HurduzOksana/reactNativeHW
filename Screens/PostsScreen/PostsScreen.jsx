import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvatar, getEmail } from "../../redux/auth/authSelectors";
import { getPosts } from "../../redux/dashboard/dashboardOperations";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { styles } from "./PostsScreen.styles";

const Posts = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const image = useSelector(getAvatar);
  const email = useSelector(getEmail);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (setPosts) {
      dispatch(getPosts(setPosts));
    }
  }, [setPosts]);

  const handleComment = (image, comments, postId) => {
    navigation.navigate("Comment", { image, comments, postId });
  };

  const handleLocation = (coordinates, text, location) => {
    navigation.navigate("Map", { coordinates, text, location });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <View style={styles.avatar}>
          {image ? (
            <Image style={styles.avatar} source={{ uri: image }} />
          ) : null}
        </View>
        <View>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <View style={styles.postsList}>
        <SafeAreaView>
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
                <Image style={styles.postImage} source={{ uri: item.image }} />
                <Text style={styles.postText}>{item.text}</Text>
                <View style={styles.postDataWrapper}>
                  <Pressable
                    onPress={() => {
                      handleComment(item.image, item.comments, item.postId);
                    }}
                  >
                    <View style={styles.postDataCommentsWrapper}>
                      <Icon name="message-circle" size={24} color="#BDBDBD" />
                      <Text style={styles.postComments}>
                        {item.comments.length ?? item.comments.length}
                      </Text>
                    </View>
                  </Pressable>
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
                      <Text style={styles.postLocation}>{item.location}</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.postId}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Posts;
