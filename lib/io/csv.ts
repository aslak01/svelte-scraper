import { CsvStringifyStream, readableStreamFromIterable } from "../imports.ts";
import { MassagedAndFilteredFinnJobAd } from "../types.ts";

export async function writeToCSV(
  data: MassagedAndFilteredFinnJobAd[],
  outfile: string,
) {
  const headers = Object.keys(data[0]);

  const f = await Deno.open(outfile, {
    write: true,
  });

  const readable = readableStreamFromIterable(data);

  await readable.pipeThrough(new CsvStringifyStream({ columns: headers }))
    .pipeThrough(new TextEncoderStream()).pipeTo(f.writable);

  f.close();
}
