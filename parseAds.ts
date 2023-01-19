import type { FinnAd } from "./types.ts";

import { postToWebhook } from "./functions.ts";

import { config as loadEnv } from "https://deno.land/std/dotenv/mod.ts";

import {
  readJSON,
  writeJSON,
  // removeFile,
} from "https://deno.land/x/flat@0.0.15/mod.ts";

import * as R from "https://x.nest.land/ramda@0.27.2/mod.ts";

const configData = await loadEnv({
  export: true,
  allowEmptyValues: true,
});

let WEEBHOOK = "";
let inputFile;

if (Deno.args[1]) {
  // running on github with webhook passed as param from actions
  WEEBHOOK = Deno.args[0];
  inputFile = Deno.args[1];
} else {
  WEEBHOOK = configData.WEBHOOK_URL;
  inputFile = Deno.args[0];
}

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
