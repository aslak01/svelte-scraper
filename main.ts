import { join } from "./lib/imports.ts";
import * as io from "./lib/io/index.ts";

// Init routine called with one argument
// Main routine called with two arguments
async function main() {
  const start = performance.now();

  if (Deno.args.length < 1) {
    console.error(
      "Please provide an input file, and optionally a webhook url.",
    );
    return;
  }

  if (Deno.args.length > 2) {
    console.error(
      "Too many input parameters provided. Please provide only 1 or 2",
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

  const outputFile = "./out/data.csv";

  let inputLines = 0;

  if (Deno.args.length === 1) {
    console.info("INITIALISING THE CSV");
    inputLines = await io.initCSVfromJson(inputFile, outputFile);
  } else {
    const webhookPath = Deno.args[1] || false;

    if (!webhookPath || typeof webhookPath !== "string") {
      console.error("The provided webhook path could not be parsed");
      return;
    }
    console.log("Performing routine");
    const prevFetchFilePath = "./data/prev/";
    const prevFetchFile = join(prevFetchFilePath, "data.json");

    const files = {
      inputFile,
      inputFilePath,
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
