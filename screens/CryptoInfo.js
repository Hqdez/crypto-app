import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from "react";
import Loading from "../components/loading";

export default function CryptoInfo({route, navigation}) {
  const id = route.params?.id

  const [cryptoInfo, setCryptoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false)

  const getCryptoInfo = useCallback(async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (data.status !== 200) {
      setError(true)
      return
    }
    const json = await data.json();
    setCryptoInfo(json)
  }, [setCryptoInfo])

  useEffect(() => {
    if (!id) navigation.navigate("crypto_list")
  }, [id])

  useEffect(() => {
    getCryptoInfo().finally(() => {
      setIsLoading(false)
    });
  }, [getCryptoInfo]);

  useEffect(() => {
    if (error) navigation.navigate("crypto_list")
  }, [error])

  if (isLoading || error) return <Loading/>

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{color: "white"}}>Nom: {cryptoInfo.name}</Text>
        <Text style={{color: "white"}}>Symbole: {cryptoInfo.symbol}</Text>
        <Text style={{color: "white"}}>Site web: {cryptoInfo.links.homepage}</Text>
        <Text style={{color: "white"}}>Valeur actuelle: {cryptoInfo.market_data.current_price.eur} €</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: "white"}}> % des dernières 24h </Text>
          <Text
            style={[
              styles.pricePercentage,
              cryptoInfo.market_data.price_change_percentage_24h_in_currency.eur > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {cryptoInfo.market_data.price_change_percentage_24h_in_currency.eur.toFixed(2)}%
          </Text>
        </View>
        <Text style={{color: "white"}}>Algorithme de hachage: {cryptoInfo.hashing_algorithm}</Text>
        <Image source={{uri: cryptoInfo.image?.large}} style={{height: 100, width: 100}} resizeMode={"contain"}/>

        {cryptoInfo.genesis_date != ""
          ?
          <Text style={{color: "white"}}>Date de création: {cryptoInfo.genesis_date}</Text>
          : null
        }

        <Text style={{color: "white"}}>Rang CoinGecko: {cryptoInfo.coingecko_rank}</Text>
        <Text style={{color: "white"}}>Score CoinGecko: {cryptoInfo.coingecko_score}</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23232b',
    borderWidth: 0,
    padding: 10,
    color: 'white',
  },
  priceUp: {
    color: "green",
  },
  priceDown: {
    color: "red",
  },
});
