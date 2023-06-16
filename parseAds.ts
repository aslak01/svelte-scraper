import type { FinnAd } from "./types.ts";

import { postToWebhook } from "./functions.ts";

import { readJSON, writeJSON } from "https://deno.land/x/flat@0.0.15/mod.ts";
import * as R from "https://x.nest.land/ramda@0.27.2/mod.ts";

const WEEBHOOK = Deno.args[0];
const inputFile = Deno.args[1];

const outputFile = `filtered_${inputFile}`;
const inputData = await readJSON(inputFile);
const currData = await readJSON(outputFile);

const inputAds = inputData.docs;
const existingAds = currData.ads;

const adsByID = <T extends { ad_id: string }>(i: T): string => i.ad_id;

const foundAds = inputAds.map(adsByID);
const currentAds = existingAds.map(adsByID);

const difference = R.difference(foundAds, currentAds);

const newAds = inputAds.filter((i: FinnAd) => difference.includes(i.ad_id));

newAds.forEach((ad: FinnAd) => {
  currData.ads.push(ad);
  postToWebhook(ad, WEEBHOOK);
});

await writeJSON(outputFile, currData);
