import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../modules/home/screens/home';
import SearchScreen from '../modules/search/screens/search';
import WatchListScreen from '../modules/watch-list/screens/watch-list';
import DetailScreen from '../modules/detail/screens/detail';
import HomeIcon from '../../assets/icons/home.svg';
import SearchLeft from '../../assets/icons/search-left.svg';
import Bookmark from '../../assets/icons/bookmark.svg';
import { colors } from '../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabBarIcon = ({ size, focused, color }) => {
  return <HomeIcon style={{ color: 'blue' }} />;
};

const SerchTabBarIcon = ({ size, focused, color }) => {
  return <SearchLeft style={{ color: 'blue' }} />;
};

const BookmarkTabBarIcon = ({ size, focused, color }) => {
  return <Bookmark style={{ color: 'blue' }} />;
};

function TabScreens() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark,
          borderColor: colors.primary,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabBarIcon,
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: SerchTabBarIcon,
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <Tab.Screen
        name="Watch List"
        component={WatchListScreen}
        options={{
          tabBarIcon: BookmarkTabBarIcon,
          tabBarActiveTintColor: colors.primary,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootTabs() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Home" component={TabScreens} />
    </Stack.Navigator>
  );
}
