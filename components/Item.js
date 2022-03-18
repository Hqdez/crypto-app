import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CryptoItem = ({ crypto }) => (
    <TouchableOpacity style={styles.containerItem}>
    <View style={styles.coinName}>
      <Image source={{ uri: crypto.image }} style={styles.image} />
      <View style={styles.containerNames}>
        <Text style={styles.text}>{crypto.name}</Text>
        <Text style={styles.textSymbol}>{crypto.symbol}</Text>
      </View>
    </View>
    <View>
      <Text style={styles.textPrice}>${crypto.current_price}</Text>
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
);

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: '#23232b',
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
  },
  text: {
    color: "#fff",
  },
  textPrice: {
    color: "#fff",
    fontWeight: "bold",
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
    width: 32,
    height: 32,
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
});

export default CryptoItem;