import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CryptoItem = ({crypto}) => {
  const navigation = useNavigation();

  const isLongPressed = () => {
    alert('Is long pressed')
  }

  return (
    <>

      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("crypto_info", {id: crypto.id})}
        onLongPress={isLongPressed}
      >
        <View style={styles.cryptoName}>
          <Image source={{uri: crypto.image}} style={styles.image}/>
          <View style={styles.names}>
            <Text style={styles.text}>{crypto.name} <Text>⭐</Text></Text>


            <Text style={styles.textSymbol}>{crypto.symbol} {crypto.id}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textPrice}>{crypto.current_price}€</Text>
          <Text
            style={[
              styles.pricePercentage,
              crypto.price_change_percentage_24h > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232b',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  names: {
    marginLeft: 10,

  },
  cryptoName: {
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  textPrice: {
    color: "#fff",
    fontSize: 20,
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "green",
  },
  priceDown: {
    color: "red",
  },
  image: {
    width: 40,
    height: 40,
  },
  textSymbol: {
    color: "orange",
    textTransform: "uppercase",
  },
});

export default CryptoItem;