import { join } from "./lib/imports.ts";
import * as io from "./lib/io/index.ts";

async function main() {
  const start = performance.now();

  if (Deno.args.length < 2) {
    console.error(
      "Please provide the input file and webhook url as parameters",
    );
    return;
  }

  if (Deno.args.length > 3) {
    console.error(
      "Too many input parameters provided. Please provide only 2 or 3.",
    );
    return;
  }

  const inputFileName = Deno.args[0];

  if (!inputFileName || inputFileName === undefined) {
    console.error(inputFileName, "not recognised");
  }
  const inputFilePath = "./data/tmp/";
  const inputFile = join(inputFilePath, inputFileName);

  const inputFileInfo = await Deno.stat(inputFile);

  if (inputFileInfo.isFile !== true) {
    console.error(
      `The provided file "${inputFileName}" is not valid.`,
    );
    return;
  }

  const webhookPath = Deno.args[1];

  if (!webhookPath || typeof webhookPath !== "string") {
    console.error("The provided webhook path could not be parsed");
    return;
  }

  const outputFile = "./out/data.csv";

  let inputLines = 0;

  if (Deno.args.length === 3) {
    console.info("INITIALISING THE CSV");
    inputLines = await io.initCSVfromJson(inputFile, outputFile);
  } else {
    console.log("Performing routine");
    const prevFetchFilePath = "./data/prev/";
    const prevFetchFile = join(prevFetchFilePath, "data.json");

    const files = {
      inputFile,
      prevFetchFile,
      prevFetchFilePath,
      outputFile,
    };

    inputLines = await io.processAds(
      files,
      webhookPath,
    );
  }

  const finish = performance.now();
  const delta = finish - start;

  console.log(`Processed ${inputLines} lines in ${delta} ms`);
}

await main();
