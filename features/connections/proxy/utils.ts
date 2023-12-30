import { generatePrivateKey, getPublicKey } from "nostr-tools";

export function createProxy(relay: string) {
  const proxySk = generatePrivateKey();
  const proxyPk = getPublicKey(proxySk);
  const nwcSecret = generatePrivateKey();
  const proxyConnectionString = `nostr+walletconnect://${proxyPk}?relay=${encodeURIComponent(
    relay
  )}&secret=${nwcSecret}`;
  return { proxySk, proxyPk, nwcSecret, proxyConnectionString };
}
