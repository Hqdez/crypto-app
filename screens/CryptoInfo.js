import {StyleSheet, Text, View, Image, ScrollView, ImageBackground} from 'react-native';
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
      <ScrollView style={styles.container}>
        <Image source={{uri: cryptoInfo.image?.large}} style={styles.image} resizeMode={"contain"}/>
        <Text style={styles.txt}>ID: {cryptoInfo.id}</Text>
        <Text style={styles.txt}>Nom: {cryptoInfo.name}</Text>
        <Text style={styles.txt}>Symbole: {cryptoInfo.symbol}</Text>
        <Text style={styles.txt}>Site web: {cryptoInfo.links.homepage}</Text>
        <Text style={styles.txt}>Valeur actuelle: {cryptoInfo.market_data.current_price.eur} €</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}> % des dernières 24h </Text>
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
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}> % sur les 7 derniers jours </Text>
          <Text
            style={[
              styles.pricePercentage,
              cryptoInfo.market_data.price_change_percentage_7d_in_currency.eur > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {cryptoInfo.market_data.price_change_percentage_7d_in_currency.eur.toFixed(2)}%
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}> % sur les 30 derniers jours </Text>
          <Text
            style={[
              styles.pricePercentage,
              cryptoInfo.market_data.price_change_percentage_30d_in_currency.eur > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {cryptoInfo.market_data.price_change_percentage_30d_in_currency.eur.toFixed(2)}%
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}> % sur les 60 derniers jours </Text>
          <Text
            style={[
              styles.pricePercentage,
              cryptoInfo.market_data.price_change_percentage_60d_in_currency.eur > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {cryptoInfo.market_data.price_change_percentage_60d_in_currency.eur.toFixed(2)}%
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}> % sur les 200 derniers jours </Text>
          <Text
            style={[
              styles.pricePercentage,
              cryptoInfo.market_data.price_change_percentage_200d_in_currency.eur > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {cryptoInfo.market_data.price_change_percentage_200d_in_currency.eur.toFixed(2)}%
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}> % sur la dernière année </Text>
          <Text
            style={[
              styles.pricePercentage,
              cryptoInfo.market_data.price_change_percentage_1y_in_currency.eur > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}
          >
            {cryptoInfo.market_data.price_change_percentage_1y_in_currency.eur.toFixed(2)}%
          </Text>
        </View>
        <Text style={styles.txt}>Nombres en circulations: {cryptoInfo.market_data.circulating_supply}</Text>
        <Text style={styles.txt}>Nombres max possible en
          circulations: {cryptoInfo.market_data.max_supply}</Text>
        <Text style={styles.txt}>Algorithme de hachage: {cryptoInfo.hashing_algorithm}</Text>


        {cryptoInfo.genesis_date != null
          ?
          <Text style={styles.txt}>Date de création: {cryptoInfo.genesis_date}</Text>
          : null
        }

        <View style={styles.mt10}>
          {cryptoInfo.description.fr === "" ? <Text style={styles.txt}>Description
            :{"\n"}{cryptoInfo.description.en}
          </Text> : <Text style={styles.txt}>Description
            :{"\n"}{cryptoInfo.description.fr}</Text>}
        </View>
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
    fontSize: 18
  },
  priceDown: {
    color: "red",
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10
  },
  txt: {
    color: 'white',
    fontSize: 18
  },
  mt10: {
    marginTop: 10
  }
});
