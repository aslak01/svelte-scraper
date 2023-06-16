import type { FinnAd } from "./types.ts";

const formatToMsg = (ad: FinnAd) => {
  return "**" + ad.company_name + "** i " + ad.location + ": *" + ad.job_title +
    "* \n" + "https://www.finn.no/job/fulltime/ad.html?finnkode=" + ad.id;
};

export const postToWebhook = async (ad: FinnAd, webhookUrl: string) => {
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
