import { readInputFile } from "./fs.ts";
import { writeToCSV } from "./csv.ts";
import { compareInputToPrevFetch, postToWebhook } from "../functions.ts";
import { emptyDir } from "../imports.ts";
import { adFilter } from "../filters.ts";

export * from "./fs.ts";
export * from "./csv.ts";

type FileReferences = {
  inputFile: string;
  prevFetchFile: string;
  prevFetchFilePath: string;
  outputFile: string;
};

export async function processAds(
  files: FileReferences,
  webhookPath: string,
): Promise<number> {
  const { inputFile, prevFetchFile, prevFetchFilePath, outputFile } = files;
  const fetchedData = await readInputFile(inputFile);
  const prevFetchData = await readInputFile(prevFetchFile);

  const newAds = compareInputToPrevFetch(fetchedData, prevFetchData);

  if (!newAds || !newAds.length || newAds.length < 1) {
    console.log("No new ads");
    // TODO: Reenable this after checked that it's working
    // await emptyDir(inputFilePath);
    console.log("cleared most recent fetch");
    // // await emptyDir(prevFetchFilePath);
    // await Deno.writeTextFile(prevFetchFile, fetchedData.docs);
    // console.log("Wrote found entries to previous fetch file");
  }

  await emptyDir(prevFetchFilePath);
  await Deno.writeTextFile(prevFetchFilePath, fetchedData.docs);

  const processedFileData = newAds.map(adFilter);

  await writeToCSV(processedFileData, outputFile);

  for (const ad of processedFileData) {
    await postToWebhook(ad, webhookPath);
  }
  return fetchedData.length;
}

export async function initCSVfromJson(
  inputFile: string,
  outputFile: string,
): Promise<number> {
  const fetchedData = await readInputFile(inputFile);

  const processedFileData = fetchedData.ads.map(adFilter);

  await writeToCSV(processedFileData, outputFile);

  return fetchedData.ads.length;
}
