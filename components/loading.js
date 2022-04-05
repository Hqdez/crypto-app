import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


export default function Loading() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chargement...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23232b',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  title: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase"
  },
});
