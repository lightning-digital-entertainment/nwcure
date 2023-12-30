import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { pool } from "../../../utils/nostr";
import { Event, nip04 } from "nostr-tools";

function getTagValue(event: Event, tagIdentifier: string, position: number) {
  const tags = event.tags;
  for (let i = 0; i < tags.length; i++) {
    if (tags[i][0] === tagIdentifier) {
      return tags[i][position];
    }
  }
}

export type Request = {
  id: string;
  sourceId: string;
  method: string;
  params: {
    [key: string]: string;
  };
};

const usePaymentRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const proxies = useAppSelector((state) => state.proxy.proxies);
  const [proxyPubkeys, proxyRelays]: [string[], string[]] = useMemo(() => {
    const pubkeys = Object.keys(proxies);
    const relays = new Set<string>();
    pubkeys.forEach((pk) => {
      const url = new URL(proxies[pk].relay);
      relays.add(url.href);
    });
    return [pubkeys, [...relays]];
  }, [proxies]);

  useEffect(() => {
    const requestSet = new Set<Request>(requests);
    const sub = pool.sub(proxyRelays, [
      {
        "#p": proxyPubkeys,
        kinds: [23194],
        since: Math.floor(Date.now() / 1000),
      },
    ]);
    sub.on("event", async (e) => {
      const requestedProxy = getTagValue(e, "p", 1);
      const content = await nip04.decrypt(
        proxies[requestedProxy].proxySk,
        e.pubkey,
        e.content
      );
      const contentObj = JSON.parse(content);
      requestSet.add({
        id: e.id,
        sourceId: proxies[requestedProxy].sourceId,
        method: contentObj.method,
        params: contentObj.params,
      });
      setRequests([...requestSet]);
    });
    return () => {
      sub.unsub();
    };
  }, [proxyRelays, proxyPubkeys]);
  return requests;
};

export default usePaymentRequests;
