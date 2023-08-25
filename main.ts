import { join } from "./lib/imports.ts";
import { adFilter } from "./lib/filters.ts";
import * as io from "./lib/io/index.ts";

async function main() {
  const start = performance.now();

  if (Deno.args.length < 2) {
    console.error(
      "Please provide the input file and webhook url as parameters",
    );
    return;
  }

  const inputFileName = Deno.args[0];
  const webhookPath = Deno.args[1];
  const outputFile = "./out/data.csv";
  const prevFetchFile = "./data/prev/data.json";

  if (inputFileName === undefined) {
    console.error(inputFileName, "not recognised");
  }

  const fetchedData = await io.readInputFile(Deno.args[0]);
  const prevFetchData = await io.readInputFile(prevFetchFile);

  const inputFile = join("./data/tmp/", inputFileName);

  // const processedFileData = await io.getFileData(inputFile, adFilter);

  await io.writeToCSV(processedFileData, outputFile);

  const finish = performance.now();
  const delta = finish - start;

  console.log(`Processed ${processedFileData.length} lines in ${delta} ms`);
}

try {
  await main();
} catch (err) {
  console.error(err);
}
