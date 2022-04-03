import React, {useEffect, useState, useCallback} from "react";
import {View, StyleSheet, FlatList, Text} from "react-native";

import Item from "../components/Item";
import {Switch} from "react-native-gesture-handler";

export default function CryptoList() {
  const [cryptoList, setCryptoList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const getCryptoList = useCallback(async () => {
    const data = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1");
    const json = await data.json();
    setCryptoList(json);
  }, [setCryptoList])

  useEffect(() => {
    getCryptoList();
  }, [getCryptoList]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste des cryptos</Text>
        <Switch
          trackColor={{false: "#767577", true: "white"}}
          thumbColor={isEnabled ? "#f5dd4b" : "orange"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <FlatList
        style={styles.list}
        data={cryptoList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Item crypto={item}/>}
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          await getCryptoList();
          setRefresh(false);
        }}
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
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
    color: 'white',
    marginTop: 70,
    paddingHorizontal: 10
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textTransform: "uppercase"
  }
});