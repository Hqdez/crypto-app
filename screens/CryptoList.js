import React, {useCallback, useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import Toast from 'react-native-toast-message'

import Item from "../components/Item";
import {Switch} from "react-native-gesture-handler";
import {getFavorites} from "../utils/localStorage";

export default function CryptoList() {
  const [cryptoList, setCryptoList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [filters, setFilters] = useState({page: 1, favorites: null})
  const [isMount, setIsMounted] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const next = useCallback(async () => {
    const newPage = filters.page + 1
    setFilters({
      page: newPage,
      favorites: filters.favorites
    })
  }, [filters])

  const toggleFavorites = useCallback(async () => {
    if (isEnabled) {
      let favorites = await getFavorites()
      setFilters({
        page: 1,
        favorites: favorites
      })
      return
    }
    setFilters({
      page: 1,
      favorites: null
    })
  }, [getFavorites, setFilters, isEnabled])

  const getCryptoList = useCallback(async (_filters) => {
    setIsRefreshing(true)
    let ids = ""
    if (_filters.favorites) {
      ids = `ids=${_filters.favorites.join(",")}&`
    }
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&${ids ? ids : ""}per_page=30&page=${_filters.page}`
    const data = await fetch(url);
    const json = await data.json()

    if (filters.page > 1) {
      setCryptoList(prevState => prevState.concat(json));
    } else {
      setCryptoList(json);
    }

    setIsRefreshing(false)
  }, [setCryptoList, filters])

  useEffect(() => {
    getCryptoList(filters);
  }, [getCryptoList, filters])

  useEffect(() => {
    if (isMount) {
      toggleFavorites()
    }
  }, [isEnabled])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste des cryptos</Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={styles.title}>Favoris </Text>
          <Switch
            trackColor={{false: "#767577", true: "white"}}
            thumbColor={isEnabled ? "orange" : "orange"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={cryptoList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Item crypto={item}/>}
        onEndReached={() => next()}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={() => getCryptoList(1)}
      />
      <Toast/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232b',
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
    color: 'white',
    marginTop: Platform.OS === 'android' ? 50 : 0,
    paddingHorizontal: 10
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  list: {
    width: "100%",
    paddingHorizontal: 10
  }
});