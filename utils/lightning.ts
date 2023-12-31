import { decode } from "light-bolt11-decoder";

export type InvoiceData = {
  amountInSats: number;
  memo?: string;
};

export function decodeInvoice(invoice: string) {
  const invoiceData = {} as InvoiceData;
  const sections = decode(invoice).sections;
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].name === "amount") {
      console.log(sections[i]);
      invoiceData.amountInSats = Math.floor(Number(sections[i].value) / 1000);
    } else if (sections[i].name === "description") {
      invoiceData.memo = sections[i].value;
    }
  }
  return invoiceData;
}
