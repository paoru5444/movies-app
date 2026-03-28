import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../modules/home/screens/home';
import SearchScreen from '../modules/search/screens/search';
import WatchListScreen from '../modules/watch-list/screens/watch-list';
import HomeIcon from '../../assets/icons/home.svg';
import SearchLeft from '../../assets/icons/search-left.svg';
import Bookmark from '../../assets/icons/bookmark.svg';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const HomeTabBarIcon = ({ size, focused, color }) => {
  return <HomeIcon style={{ color: 'blue' }} />;
};

const SerchTabBarIcon = ({ size, focused, color }) => {
  return <SearchLeft style={{ color: 'blue' }} />;
};

const BookmarkTabBarIcon = ({ size, focused, color }) => {
  return <Bookmark style={{ color: 'blue' }} />;
};

export default function RootTabs() {
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
