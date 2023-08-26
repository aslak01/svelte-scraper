export async function readInputFile(inputFile: string) {
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
