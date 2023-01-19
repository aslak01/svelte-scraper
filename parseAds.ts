import type { FinnAd } from "./types.ts";

import { postToWebhook } from "./functions.ts";

import {
  readJSON,
  writeJSON,
  // removeFile,
} from "https://deno.land/x/flat@0.0.15/mod.ts";

import * as R from "https://x.nest.land/ramda@0.27.2/mod.ts";

const WEEBHOOK =
  "https://discord.com/api/webhooks/1065723386514391050/j5ElyHMIO-rUJRHfNJ1OQg_kPb4lesyy4p7aD3p5JMjt9dhgcOB3NFB6rlbMnZypEOUa";

// The filename is the first invocation argument
const inputFile = Deno.args[0];

const outputFile = `filtered_${inputFile}`;
const inputData = await readJSON(inputFile);
const existingData = await readJSON(outputFile);

const inputAds = inputData.docs;
const existingAds = existingData.ads;

const adsByID = (i: FinnAd) => i.ad_id;

const foundAds = inputAds.map(adsByID);
const currentAds = existingAds.map(adsByID);

const difference = R.difference(foundAds, currentAds);

if (difference.length) {
  const newAds = inputAds.filter((i: FinnAd) => difference.includes(i.ad_id));
  const newData = existingData;
  newAds.forEach((ad: FinnAd) => {
    newData.ads.push(ad);
    postToWebhook(ad, WEEBHOOK);
  });

  await writeJSON(outputFile, newData);
}

// removeFile(inputFile);
