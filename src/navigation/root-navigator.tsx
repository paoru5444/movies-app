import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../modules/home/screens/home';
import SearchScreen from '../modules/search/screens/search';
import WatchListScreen from '../modules/watch-list/screens/watch-list';

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="search" component={SearchScreen} />
      <Tab.Screen name="watch-list" component={WatchListScreen} />
    </Tab.Navigator>
  );
}
