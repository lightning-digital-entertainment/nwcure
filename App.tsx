import { NavigationContainer } from "@react-navigation/native";
import { store } from "./store/store";
import { Provider } from "react-redux";
import PolyfillCrypto from "react-native-webview-crypto";
import { SQLiteProvider } from "expo-sqlite/next";
import MainTabNavigator from "./nav/MainTabNavigator";
import "./utils/database";
import { db, initDb } from "./utils/database";
import { useEffect } from "react";
import { Source, addSource } from "./features/sources/sourceSlice";
import { Proxy, addProxy } from "./features/connections/proxy/proxySlice";

function Root() {
  useEffect(() => {
    async function init() {
      const sources = await db.getAllAsync(`SELECT * from sources`);
      const proxies = await db.getAllAsync(`SELECT * from proxies`);
      sources.forEach((entry: Source) => {
        store.dispatch(
          addSource({
            id: entry.id,
            name: entry.name,
            connectionString: entry.connectionString,
            walletPubkey: entry.walletPubkey,
            secret: entry.secret,
            relay: entry.relay,
          })
        );
      });
      proxies.forEach((entry: Proxy) => {
        store.dispatch(
          addProxy({
            proxyPk: entry.proxyPk,
            name: entry.name,
            proxySk: entry.proxySk,
            connectionString: entry.connectionString,
            secret: entry.nwcSecret,
            relay: entry.relay,
            sourceId: entry.sourceId,
          })
        );
      });
    }
    init();
  }, []);
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="nwcure.db" onInit={initDb}>
      <Provider store={store}>
        <PolyfillCrypto />
        <Root />
      </Provider>
    </SQLiteProvider>
  );
}
