import RootNavigation from "./src/navigation/RootNavigation";
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from "./src/store/store";
import Player from "./src/components/Player/Player";
import { setCustomText } from 'react-native-global-props';
import SongBottomSheetContextProvider from "./src/context/SongBottomSheet";
import CreatePlaylistSheetContextProvider from "./src/context/CreatePlaylistSheet";
import AddSongPlaylistSheetContextProvider from "./src/context/AddSongToPlaylistSheet";
import Toast from "react-native-toast-message";

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
        <AddSongPlaylistSheetContextProvider>
          <SongBottomSheetContextProvider>
            <CreatePlaylistSheetContextProvider>
              <RootNavigation />
            </CreatePlaylistSheetContextProvider>
          </SongBottomSheetContextProvider>
        </AddSongPlaylistSheetContextProvider>
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
}
