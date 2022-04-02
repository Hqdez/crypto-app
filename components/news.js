import {StyleSheet, Text, View} from 'react-native';


export default function News() {
  /*  const [cryptoNews, setCryptoNews] = useState([]);

    const getCryptoNews = useCallback(async () => {
      const data = await fetch("https://api.coinstats.app/public/v1/news/latest?skip=0&limit=1");
      const json = await data.json();
      setCryptoNews(json);
      console.log(json)
    }, [setCryptoNews])

    useEffect(() => {
      getCryptoNews();
    }, [getCryptoNews]);

    */
  return (
    <View style={styles.container}>
      <Text>News</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    padding: 10
  },
});
