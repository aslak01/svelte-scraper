import {
  readJSON,
  removeFile,
  writeJSON,
} from "https://deno.land/x/flat@0.0.14/mod.ts";
// The filename is the first invocation argument
const filename = Deno.args[0];
const data = await readJSON(filename);

// Pluck a specific key off
// and write it out to a different file
// Careful! any uncaught errors and the workflow will fail, committing nothing.
const newfile = `filtered_${filename}`;
await writeJSON(newfile, data.docs);

removeFile(filename);
