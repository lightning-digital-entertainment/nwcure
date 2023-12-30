import { useSQLiteContext } from "expo-sqlite/next";
import { addSource, deleteSource, selectSourceIds } from "../sourceSlice";
import { CryptoDigestAlgorithm, digestStringAsync } from "expo-crypto";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { parseConnectionString } from "../../../utils/nwc";

export const useSourceManagement = () => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const sourceIds = useAppSelector(selectSourceIds);

  async function addSourceFn(connectionString: string, name: string) {
    const parsedString = parseConnectionString(connectionString);
    const id = await digestStringAsync(
      CryptoDigestAlgorithm.MD5,
      connectionString
    );
    if (sourceIds.includes(id)) {
      throw new Error("This source already exists");
    }
    const values = [
      id,
      name,
      connectionString,
      parsedString.walletPubkey,
      parsedString.secret,
      parsedString.relay,
    ];
    const res = await db.runAsync(
      `INSERT INTO sources (id, name, connectionString, walletPubkey, secret, relay) VALUES (?, ?, ?, ?, ?, ?)`,
      values
    );
    dispatch(
      addSource({
        id,
        name,
        connectionString,
        walletPubkey: parsedString.walletPubkey,
        secret: parsedString.secret,
        relay: parsedString.relay,
      })
    );
  }

  async function deleteSourceFn(id: string) {
    const res = await db.runAsync(`DELETE FROM sources WHERE id = ?`, id);
    console.log(res);
    dispatch(deleteSource(id));
  }
  return { addSourceFn, deleteSourceFn };
};
