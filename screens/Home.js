import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import React from "react";
import News from "../components/news";
import Version from "../components/version";

export default function Home() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Crypto APP</Text>
        </View>
        <View style={styles.logo}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 300, resizeMode: "contain" }}
          />
        </View>
        <News />
        <Version />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23232b",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    marginBottom: 10,
    alignItems: "center",
    color: "white",
    marginTop: Platform.OS === "android" ? 50 : 0,
    paddingHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 4,
    height: 0,
  },
});
