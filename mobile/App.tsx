import RootNavigation from "./src/navigation/RootNavigation";
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from "./src/store/store";
import Player from "./src/components/Player/Player";
import { setCustomText } from 'react-native-global-props';

// Cấu hình font mặc định
const customTextProps = {
  style: {
    fontFamily: 'Raleway-Regular',
  }
};

setCustomText(customTextProps);

export default function App() {
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
