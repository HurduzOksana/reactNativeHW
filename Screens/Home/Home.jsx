import React from "react";
import { useDispatch } from "react-redux";
import { styles } from "./Home.styles";
import { HeaderBackButton } from "@react-navigation/elements";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Feather";

import CreatePost from "../CreatePostsScreen/CreatePostsScreen";
import Profile from "../ProfileScreen/ProfileScreen";
import Posts from "../PostsScreen/PostsScreen";
import Comments from "../CommentsScreen/CommentsScreen";
import Map from "../MapScreen/MapScreen";

import { signOut } from "../../redux/auth/authOperations";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarItemStyle:
          route.name === "Comment" || route.name === "Map"
            ? { display: "none" }
            : {
                maxWidth: 70,
                width: 70,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveBackgroundColor: "transparent",
        tabBarIconStyle: { strokeWidth: 1 },
        tabBarStyle: {
          display:
            route.name === "Create post" ||
            route.name === "Comment" ||
            route.name === "Map"
              ? "none"
              : "flex",
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingHorizontal: 81,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid";
          } else if (route.name === "Create post") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={Posts}
        options={{
          headerTitleAlign: "center",
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              <Icon name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="Create post"
        component={CreatePost}
        options={{
          headerTitleAlign: "center",
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerLeft: () => (
            <HeaderBackButton
              backImage={() => (
                <Icon name="arrow-left" size={24} color="#BDBDBD" />
              )}
              onPress={() => navigation.navigate("Posts")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="Comment"
        component={Comments}
        options={{
          headerTitleAlign: "center",
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerLeft: () => (
            <HeaderBackButton
              backImage={() => (
                <Icon name="arrow-left" size={24} color="#BDBDBD" />
              )}
              onPress={() => navigation.navigate("Posts")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        component={Map}
        options={{
          headerTitleAlign: "center",
          headerStyle: styles.headerBox,
          headerPressColor: "#FF6C00",
          headerTitleStyle: styles.headerTitle,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerLeft: () => (
            <HeaderBackButton
              backImage={() => (
                <Icon name="arrow-left" size={24} color="#BDBDBD" />
              )}
              onPress={() => navigation.navigate("Posts")}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;
