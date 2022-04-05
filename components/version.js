import {StyleSheet, Text, View} from 'react-native';
import {version} from '../package.json';

export default function Version() {


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>V{version}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
    paddingRight: 10
  },
  title: {
    color: "white",
    fontSize: 12,
    textTransform: "uppercase"
  },
});
