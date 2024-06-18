import { Text, View } from "react-native";
import RootNavigation from "./src/navigation/RootNavigation";
import { Provider } from 'react-redux'
import { store } from "@/store/store";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Index() {
  
  return (
    <Provider store={store}>
      <View style={{ flex: 1}}>
        <RootNavigation />
      </View>
    </Provider>
  );
}
