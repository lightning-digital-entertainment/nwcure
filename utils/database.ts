import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite/next";

export let db: SQLiteDatabase;

export async function initDb(openedDb: SQLiteDatabase) {
  db = openedDb;

  await db.execAsync(`
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS sources (
id TEXT PRIMARY KEY NOT NULL,
name TEXT NOT NULL,
connectionString TEXT NOT NULL,
walletPubkey TEXT NOT NULL,
secret TEXT NOT NULL,
relay TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS proxies (
proxyPk TEXT PRIMARY KEY NOT NULL,
name TEXT NOT NULL,
proxySk TEXT NOT NULL,
nwcSecret TEXT NOT NULL,
connectionString TEXT NOT NULL,
relay TEXT NOT NULL,
sourceId TEXT NOT NULL,
FOREIGN KEY(sourceId) REFERENCES sources(id));
`);
}

export async function test() {
  const res = await db.getAllAsync("SELECT * FROM proxies");
  console.log(res);
}
