import {ActivityIndicator, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState, useCallback} from "react";


export default function News() {
  const [cryptoNews, setCryptoNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCryptoNews = useCallback(async () => {
    try {
      const data = await fetch("https://api.coinstats.app/public/v1/news/latest?skip=0&limit=2");
      const json = await data.json();
      setCryptoNews(json);
    } catch (e) {
      console.log(e)
    }
  }, [setCryptoNews])

  useEffect(() => {
    getCryptoNews();
  }, [getCryptoNews]);

  useEffect(() => {
    if (cryptoNews) {
      setIsLoading(false)
    }
  }, [cryptoNews])

  if (isLoading) {
    return <ActivityIndicator/>
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
      <ScrollView>
        {
          cryptoNews.news ?
            cryptoNews.news.map((element) => {
                return (
                  <View key={element.id} style={{margin: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      
                      <Text
                        style={[styles.txt, {
                          textDecorationLine: 'underline',
                          marginBottom: 10,
                        }]}>{element.title}</Text>

                    </View>
                    <Text style={styles.txt}>{element.description}</Text>
                    <Text style={[styles.txt, {
                      textDecorationLine: 'underline',
                      textAlign: 'right'
                    }]}>Sources: {element.source}</Text>
                  </View>)
              }
            )
            : <View style={{flex: 1, alignItems: 'center'}}><ActivityIndicator/></View>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  txt: {
    color: 'white',
    fontSize: 16,
    padding: 0
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 10
  }

});
