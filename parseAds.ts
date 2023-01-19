import {
  readJSON,
  removeFile,
  writeJSON,
} from "https://deno.land/x/flat@0.0.15/mod.ts";

import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

// The filename is the first invocation argument
const inputFile = Deno.args[0];
const outputFile = `filtered_${inputFile}`;

const input = await readJSON(inputFile);
let data = await readJSON(outputFile);
if (typeof data === "undefined") {
  data = { ads: [] };
}

const inputAds = input.docs;
const existingAds = data.ads;

const adsByID = (i: { ad_id: number }) => i.ad_id;

const currentAds = existingAds.map(adsByID);
const foundAds = inputAds.map(adsByID);

const difference = R.difference(foundAds, currentAds);

if (difference.length) {
  const newAds = inputAds.filter((i: { ad_id: number }) =>
    difference.includes(i.ad_id)
  );
  const newData = { ads: [] };
  newData.ads.push(newAds);
  await writeJSON(outputFile, newData);
  // do webhook
}

removeFile(inputFile);
