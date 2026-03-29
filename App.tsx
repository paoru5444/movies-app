import { NavigationContainer } from '@react-navigation/native';
import RootTabs from './src/navigation/root-navigator';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BootSplash from 'react-native-bootsplash';

function App() {
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
        <QueryClientProvider client={queryClient}>
          <RootTabs />
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
