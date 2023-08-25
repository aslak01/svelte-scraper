import type {
  FetchedFinnJobAds,
  FinnJobAd,
  MassagedAndFilteredFinnJobAd,
} from "./types.ts";

const formatToMsg = (ad: MassagedAndFilteredFinnJobAd) => {
  return "**" + ad.company_name + "** i " + ad.location + ": *" + ad.job_title +
    "* \n" + "https://www.finn.no/job/fulltime/ad.html?finnkode=" + ad.id;
};

export const postToWebhook = async (
  ad: MassagedAndFilteredFinnJobAd,
  webhookUrl: string,
) => {
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

export function getFinnAdId(ad: FinnJobAd) {
  return ad.ad_id ? String(ad.ad_id) : String(ad.id);
}

export function compareInputToPrevFetch(
  fetched: FetchedFinnJobAds,
  prev: FinnJobAd[],
) {
  const { docs } = fetched;
  const fetchedAdIds = docs.map(getFinnAdId);
  const prevAdIds = prev.map(getFinnAdId);

  const diff = findUniqueEntries(prevAdIds, fetchedAdIds);

  return docs.filter((ad) => diff.includes(getFinnAdId(ad)));
}
