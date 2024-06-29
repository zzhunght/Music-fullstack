import RootNavigation from "./src/navigation/RootNavigation";
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from "./src/store/store";
import Player from "./src/components/Player/Player";
import useTrackPlayer from "./src/hooks/useTrackPlayer";
export default function App() {
  useTrackPlayer()
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
        <Player />
        {/* <BottomTabs/> */}
      </GestureHandlerRootView>
    </Provider>
  );
}
