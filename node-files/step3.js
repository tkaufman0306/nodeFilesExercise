const fs = require("fs");
const process = require("process");
const axios = require("axios");

/** read file at path and print it out. */

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", function (err) {
      if (err) {
        console.error("Couldnt write ${out}: ${err}");
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading ${path}: ${err}");
      process.exit(1);
    } else {
      console.log(data, out);
    }
  });
}

cat(process.ergv[2]);

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
    console.log(resp.data);
  } catch (err) {
    console.error("Error fetching ${url}: ${err}");
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === "--out") {
  out = process.ergv[3];
  path - process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path, out);
} else {
  cat(path, out);
}
