import type { FinnAd } from "./types.ts";

import { postToWebhook } from "./functions.ts";

import { readJSON, writeJSON } from "https://deno.land/x/flat@0.0.15/mod.ts";

const WEEBHOOK = Deno.args[0];
const inputFile = Deno.args[1];

const outputFile = `filtered_${inputFile}`;
const inputData = await readJSON(inputFile);
const currData = await readJSON(outputFile);

const inputAds = inputData.docs;
const existingIds = new Set(currData.ads.map((i: FinnAd) => i.ad_id));

const newAds = inputAds.filter((i: FinnAd) => !existingIds.has(i.ad_id));

newAds.forEach((ad: FinnAd) => {
  currData.ads.push(ad);
  postToWebhook(ad, WEEBHOOK);
});

await writeJSON(outputFile, currData);
