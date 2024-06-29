import { Text, View } from "react-native";
import RootNavigation from "./src/navigation/RootNavigation";
import { Provider } from 'react-redux'
import { store } from "@/store/store";
import Player from "./src/components/Player/Player";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabs from "./src/components/BottomTabs/BottomTabs";
export default function Index() {

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
