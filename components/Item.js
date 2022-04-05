import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Animated} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {getFavorites, setFavorites, removeFavorites} from "../utils/localStorage";
import Toast from 'react-native-toast-message';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const CryptoItem = ({crypto}) => {
  const navigation = useNavigation();

  const showToastAdd = () => {
    return (
      Toast.show({
        type: 'success',
        text1: `${crypto.id} a bien été ajouter à vos favoris.`
      }));
  }

  const showToastRemove = () => {
    return (
      Toast.show({
        type: 'success',
        text1: `${crypto.id} a bien été retirer de vos favoris.`
      }));
  }

  const LeftSwipeActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [15, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
    return (
      <View style={{flex: 1, backgroundColor: 'green', justifyContent: 'center'}}>
        <Animated.Text
          style={{
            color: 'white',
            fontWeight: '600',
            transform: [{scale}],
            paddingHorizontal: 10
          }}
        >
          Ajouter aux favoris
        </Animated.Text>
      </View>
    );
  };
  const rightSwipeActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 15],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })
    return (
      <View style={{flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-end'}}>
        <Animated.Text
          style={{
            color: 'white',
            fontWeight: '600',
            transform: [{scale}],
            paddingHorizontal: 10
          }}
        >
          Supprimer des favoris
        </Animated.Text>
      </View>
    );
  };

  const addToFavorite = async () => {
    await setFavorites(crypto.id)
    showToastAdd();
  };
  const removeInFavorite = async () => {
    await removeFavorites(crypto.id)
    showToastRemove();
  };

  return (
    <>

      <Swipeable
        renderLeftActions={LeftSwipeActions}
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={removeInFavorite}
        onSwipeableLeftOpen={addToFavorite}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("crypto_info", {id: crypto.id})}
        >
          <View style={styles.container}>
            <View style={styles.cryptoName}>
              <Image source={{uri: crypto.image}} style={styles.image}/>
              <View style={styles.names}>
                <Text style={styles.text}>{crypto.name} </Text>
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
          </View>
        </TouchableOpacity>
      </Swipeable>
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