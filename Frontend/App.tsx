import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { Search } from './components/Search';
import { Builder } from './components/Builder';
import { Saved } from './components/Saved';
import { Profile } from './components/Profile';
import { CourseDetail } from './components/CourseDetail';
import { Calendar, Search as SearchIcon, Grid3x3, Bookmark, User } from 'lucide-react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let IconName;

          if (route.name === 'Dashboard') {
            IconName = Calendar;
          } else if (route.name === 'Search') {
            IconName = SearchIcon; // Renamed to avoid alias conflict if needed
          } else if (route.name === 'Builder') {
            IconName = Grid3x3;
          } else if (route.name === 'Saved') {
            IconName = Bookmark;
          } else if (route.name === 'Profile') {
            IconName = User;
          }

          return <IconName size={size} color={color} strokeWidth={focused ? 2.5 : 2} />;
        },
        tabBarActiveTintColor: '#500000',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          height: 72,
          paddingBottom: 20,
          paddingTop: 10,
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ title: 'Schedule' }} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Builder" component={Builder} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


import { registerRootComponent } from 'expo';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="CourseDetail" component={CourseDetail} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);

