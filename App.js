import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Home from "./screens/Home";
import {NavigationContainer} from "@react-navigation/native";
import MainNavigation from "./navigation/MainNavigation";

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <MainNavigation/>
      <StatusBar style="light"/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
  },
});
