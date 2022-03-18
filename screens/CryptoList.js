import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Item from "../components/Item";

export default function CryptoList() {
  const [cryptoList, setCryptoList] = useState([]);

  const getCryptoList = useCallback(async () => {
    const data = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1");
    const json = await data.json();
    setCryptoList(json);
  }, [])

  useEffect(() => {
    getCryptoList();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={cryptoList}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => <Item crypto={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232b',
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
});