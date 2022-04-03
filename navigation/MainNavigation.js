import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from "../screens/Home"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CryptoListNavigator from "./CryptoListNavigator";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#23232b',
          borderTopWidth: 0,
          color: "white",
          justifyContent: 'center',
          paddingTop: 10,
          height: 70
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
          fontWeight: "600",
          textTransform: "uppercase"
        },
      }}

    >
      <Tab.Screen
        name="Crypto APP"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="web" color={color} size={36}/>
          ),
        }}/>
      <Tab.Screen
        name="Cryptos"
        component={CryptoListNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="bitcoin" color={color} size={36}/>
          ),
        }}/>
    </Tab.Navigator>
  );
}
