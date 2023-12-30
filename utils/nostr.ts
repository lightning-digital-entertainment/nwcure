import { Event, SimplePool } from "nostr-tools";

export const pool = new SimplePool();

export function publishEvent(relays: string[], event: Event) {
  return new Promise<void>((resolve, reject) => {
    let handled = 0;
    let errors = 0;
    const timer = setTimeout(resolve, 3200);
    function checkIfHandled() {
      if (handled === relays.length) {
        if (errors === relays.length) {
          return reject();
        }
        clearTimeout(timer);
        resolve();
      }
    }
    const pubs = pool.publish(relays, event);
    pubs.on("ok", () => {
      handled += 1;
      console.log("Publish successfull");
      checkIfHandled();
    });
    pubs.on("failed", () => {
      handled += 1;
      console.log("Publish failed");
      errors += 1;
      checkIfHandled();
    });
  });
}
