import { CsvStringifyStream, readableStreamFromIterable } from "../imports.ts";
import { FinnJobAd, MassagedAndFilteredFinnJobAd } from "../types.ts";

export async function writeToCSV(
  data: MassagedAndFilteredFinnJobAd[],
  outfile: string,
  useHeaders = false,
) {
  const f = await Deno.open(outfile, {
    write: true,
  });

  const readable = readableStreamFromIterable(data);

  let opts;

  if (useHeaders) {
    const columns = Object.keys(data[0]);
    opts = { columns };
  }

  await readable.pipeThrough(new CsvStringifyStream(opts))
    .pipeThrough(new TextEncoderStream()).pipeTo(f.writable);
}

export async function writeJson(
  data: FinnJobAd[],
  outfile: string,
) {
  await Deno.writeTextFile(outfile, JSON.stringify(data));
}
