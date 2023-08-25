import type { FinnJobAd } from "./types.ts";

const formatToMsg = (ad: FinnJobAd) => {
  return "**" + ad.company_name + "** i " + ad.location + ": *" + ad.job_title +
    "* \n" + "https://www.finn.no/job/fulltime/ad.html?finnkode=" + ad.id;
};

export const postToWebhook = async (ad: FinnJobAd, webhookUrl: string) => {
  const content = { content: formatToMsg(ad) };
  const resp = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });

  console.log("posted", resp);
};

export function findUniqueEntries(arr1: string[], arr2: string[]): string[] {
  const combinedArray = [...arr1, ...arr2];

  const uniqueEntries = combinedArray.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return uniqueEntries;
}

export function compareInputToPrevFetch(
  //
) {
  //
}
