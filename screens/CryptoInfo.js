import {StyleSheet, Text, SafeAreaView, View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from "react";


export default function CryptoInfo({ route, navigation }) {
  const id = route.params?.id

  const [cryptoInfo, setCryptoInfo] = useState([]);

  const getCryptoInfo = useCallback(async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    const json = await data.json();
    setCryptoInfo(json);
    console.log(json)
  }, [setCryptoInfo])

  useEffect(() => {
    if (!id) navigation.navigate("crypto_list")
  }, [id])




  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={cryptoInfo}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Item crypto={item} />}
      />
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
