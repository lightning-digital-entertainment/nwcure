import { useSQLiteContext } from "expo-sqlite/next";
import { useDispatch } from "react-redux";
import { createProxy } from "../utils";
import { addProxy } from "../proxySlice";
import { Source } from "../../../sources/sourceSlice";

const useProxyManagement = () => {
  const dispatch = useDispatch();
  const db = useSQLiteContext();

  async function addProxyFn(name: string, defaultSource: Source) {
    const proxy = createProxy(defaultSource.relay);
    const values = [
      proxy.proxyPk,
      name,
      proxy.proxySk,
      proxy.nwcSecret,
      proxy.proxyConnectionString,
      defaultSource.relay,
      defaultSource.id,
    ];
    const res = await db.runAsync(
      `INSERT INTO proxies (proxyPk, name, proxySk, nwcSecret, connectionString, relay, sourceId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      values
    );
    dispatch(
      addProxy({
        proxyPk: proxy.proxyPk,
        proxySk: proxy.proxySk,
        connectionString: proxy.proxyConnectionString,
        secret: proxy.nwcSecret,
        name,
        relay: defaultSource.relay,
        sourceId: defaultSource.id,
      })
    );
  }
  return { addProxyFn };
};

export default useProxyManagement;
