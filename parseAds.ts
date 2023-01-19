import {
  readJSON,
  writeJSON,
  // removeFile,
} from "https://deno.land/x/flat@0.0.15/mod.ts";

import * as R from "https://x.nest.land/ramda@0.27.2/mod.ts";

// The filename is the first invocation argument
const inputFile = Deno.args[0];

const outputFile = `filtered_${inputFile}`;
const inputData = await readJSON(inputFile);
const existingData = await readJSON(outputFile);

const inputAds = inputData.docs;
const existingAds = existingData.ads;

const adsByID = (i: { ad_id: number }) => i.ad_id;

const foundAds = inputAds.map(adsByID);
const currentAds = existingAds.map(adsByID);

const difference = R.difference(foundAds, currentAds);

if (difference.length) {
  const newAds = inputAds.filter((i: { ad_id: number }) =>
    difference.includes(i.ad_id)
  );
  const newData = existingData;
  newData.ads.push(newAds);
  await writeJSON(outputFile, newData);
  // do webhook
}

// removeFile(inputFile);
