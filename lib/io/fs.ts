import { join } from "../imports.ts";

export async function readInputFile(fileName: string) {
  const inputFile = join("data/tmp/", fileName);
  const inputFileInfo = await Deno.stat(inputFile);

  if (inputFileInfo.isFile !== true) {
    console.error(
      `The provided "${inputFile}" is not a valid file.`,
    );
    return;
  }

  const inputFileContent = await Deno.readTextFile(inputFile);

  return JSON.parse(inputFileContent);
}
