import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from "react";

export default function CryptoInfo({route, navigation}) {
  const id = route.params?.id

  const [cryptoInfo, setCryptoInfo] = useState([]);

  const getCryptoInfo = useCallback(async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const json = await data.json();
    setCryptoInfo(json);
  }, [setCryptoInfo])

  useEffect(() => {
    if (!id) navigation.navigate("crypto_list")
  }, [id])

  useEffect(() => {
    getCryptoInfo();
  }, [getCryptoInfo]);


  return (
    <View style={styles.container}>
      <Image source={{uri: 'cryptoInfo.image'}} style={styles.image}/>
      <Text>Nom: {cryptoInfo.name}</Text>
      <Text>Rang CoinGecko: {cryptoInfo.coingecko_rank}</Text>
      <Text>Score CoinGecko: {cryptoInfo.coingecko_score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23232b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    padding: 10
  },
});
