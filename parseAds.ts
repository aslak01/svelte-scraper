import type { FinnAd } from "./types.ts";

import { postToWebhook } from "./functions.ts";

const WEEBHOOK = Deno.args[0];
const inputFile = Deno.args[1];

const outputFile = `filtered_${inputFile}`;
const inputData = JSON.parse(await Deno.readTextFile(inputFile));
const currData = JSON.parse(await Deno.readTextFile(outputFile));

const inputAds = inputData.docs;
const existingIds = new Set(currData.ads.map((i: FinnAd) => i.ad_id));

const newAds = inputAds.filter((i: FinnAd) => !existingIds.has(i.ad_id));

for (const ad of newAds) {
  currData.ads.push(ad);
  await postToWebhook(ad, WEEBHOOK);
}

await Deno.writeTextFile(outputFile, JSON.stringify(currData, null, 2));
