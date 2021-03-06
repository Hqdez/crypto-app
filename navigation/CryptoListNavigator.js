import {createStackNavigator} from '@react-navigation/stack';
import CryptoList from "../screens/CryptoList";
import CryptoInfo from "../screens/CryptoInfo";

const Stack = createStackNavigator();

export default function CryptoListNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#23232b',
          borderTopWidth: 0,
          color: "white",
          paddingTop: 10,
          height: 90,
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
        tabBarOptions: {
          showLabel: false,
        },
        headerStyle: {
          backgroundColor: '#23232b',
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 20,
        },
        headerTintColor: 'white',
        headerBackVisible: false
      }}
      options={{
        headerBackTitleVisible: false
      }}>
      <Stack.Screen
        name="crypto_list"
        component={CryptoList}
        options={{
          headerShown: false,
        }}/>
      <Stack.Screen
        options={({route}) => ({
          title: route.params?.id.toUpperCase(),
          headerBackTitleVisible: false
        })}
        name="crypto_info"
        component={CryptoInfo}/>
    </Stack.Navigator>
  );
}
