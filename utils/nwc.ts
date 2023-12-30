import {
  Event,
  getEventHash,
  getPublicKey,
  nip04,
  signEvent,
} from "nostr-tools";
import { pool, publishEvent } from "./nostr";

async function createRequest(
  walletPubkey: string,
  secret: string,
  payloadString: string
) {
  const pk = getPublicKey(secret);
  const event: Event = {
    kind: 23194,
    content: "",
    tags: [["p", walletPubkey]],
    created_at: Math.floor(Date.now() / 1000),
    pubkey: pk,
    id: "",
    sig: "",
  };
  event.content = await nip04.encrypt(secret, walletPubkey, payloadString);
  event.id = getEventHash(event);
  event.sig = signEvent(event, secret);
  return event;
}

export async function requestPayment(
  walletPubkey: string,
  invoice: string,
  secret: string,
  relay: string
) {
  const event = await createPaymentRequest(walletPubkey, invoice, secret);
  await publishEvent([relay], event);
}

export async function createPaymentRequest(
  walletPubkey: string,
  invoice: string,
  secret: string
) {
  const pk = getPublicKey(secret);
  const event: Event = {
    kind: 23194,
    content: "",
    tags: [["p", walletPubkey]],
    created_at: Math.floor(Date.now() / 1000),
    pubkey: pk,
    id: "",
    sig: "",
  };
  const payload = { method: "pay_invoice", params: { invoice: invoice } };

  event.content = await nip04.encrypt(
    secret,
    walletPubkey,
    JSON.stringify(payload)
  );
  event.id = getEventHash(event);
  event.sig = signEvent(event, secret);
  return event;
}

export function parseConnectionString(connectionString: string) {
  const connectionUrl = new URL(connectionString);
  if (connectionUrl.protocol != "nostr+walletconnect:") {
    throw new Error("Connection string is not a NWC string...");
  }
  const paramsObj = { walletPubkey: connectionUrl.host, relay: "", secret: "" };
  for (const [key, value] of connectionUrl.searchParams) {
    paramsObj[key] = value;
  }
  if (!paramsObj.walletPubkey || !paramsObj.relay || !paramsObj.secret) {
    throw new Error("Incomplete connection string");
  }
  return paramsObj;
}

export async function getBalance(
  walletPubkey: string,
  secret: string,
  relay: string
) {
  const payload = JSON.stringify({ method: "get_balance" });
  const event = await createRequest(walletPubkey, secret, payload);
  try {
    const sub = pool.sub(
      [relay],
      [
        {
          kinds: [23195],
          "#e": [event.id],
        },
      ]
    );
    return new Promise((res, rej) => {
      sub.on("event", async (e) => {
        const content = await nip04.decrypt(secret, e.pubkey, e.content);
        sub.unsub();

        res(content);
      });
      publishEvent([relay], event);
    });
  } catch (e) {
    throw new Error("Could not get balance");
  }
}
