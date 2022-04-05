import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@key')
    console.log(jsonValue)
    return jsonValue ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log(e)
  }
}

export const setFavorites = async (value) => {
  try {
    const storage = await AsyncStorage.getItem('@key')
    if (storage) {
      const store = JSON.parse(storage)

      store.push(value)
      const jsonValue = JSON.stringify(store)
      await AsyncStorage.setItem('@key', jsonValue)

    } else {
      const store = []
      store.push(value)
      const jsonValue = JSON.stringify(store)
      await AsyncStorage.setItem('@key', jsonValue)
    }
    await getFavorites()
    console.log(getFavorites)
  } catch (e) {
    console.log(e)
  }
}

export const removeFavorites = async (value) => {
  const storage = await AsyncStorage.getItem('@key')
  const store = JSON.parse(storage)
  let newStore = [];
  for (let i = 0; i < store.length; i++) {
    if (store[i] != value) {
      newStore.push(store[i])
    }
  }
  const jsonValue = JSON.stringify(newStore)
  await AsyncStorage.setItem('@key', jsonValue)
};