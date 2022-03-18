import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home"
import CryptoList from "../screens/CryptoList";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator
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
          color: "white"
        },
      }}

    >
      <Tab.Screen
        name="Current"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="web" color={color} size={36} />
          ),
      }}/>
      <Tab.Screen
        name="Cryptos"
        component={CryptoList}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bitcoin" color={color} size={36} />
          ),
        }}/>
    </Tab.Navigator>
  );
}
