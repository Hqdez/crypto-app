import {StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import News from "../components/news";


export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text>LOGO</Text>
      </View>
      <News/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23232b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  logo: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 4,
    padding: 10
  }

});
