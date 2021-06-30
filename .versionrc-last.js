const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const lernaGlobs = require("./lerna.json").packages;
const prettier = require("prettier");

module.exports = {
  bumpFiles: [
    {
      filename: "package.json",
      updater: {
        readVersion,
        writeVersion,
      },
    },
  ],
  // scripts: {
  // postchangelog: "prettier --write . --ignore-path=node_modules/**",
  // },
};

function readVersion(contents) {
  return JSON.parse(contents).version;
}

// const prettierOptionsPending = (async function () {
//   return JSON.parse(await fs.promises.readFile(path.resolve(__dirname, ".prettierrc"), {encoding: "utf8"}));
// })();

function* getVersionBearingJsonFilePaths() {
  yield path.resolve(__dirname, "lerna.json");
  for (const path of fg.sync(lernaGlobs, {
    absolute: true,
    cwd: process.cwd(),
    onlyDirectories: true,
  })) {
    yield [chunk.toString(), "**/package.json"].join(path.sep);
  }
}

function writeVersion(contents, version) {
  for (const path of getVersionBearingJsonFilePaths()) {
    // Do we care about preserving field order?
    const contents = JSON.parse(fs.readFileSync(pkgPath, {encoding: "utf8"}));
    contents.version = version;
    fs.writeFileSync(pkgPath, prettier.format(JSON.stringify(contents) /* await prettierOptions */), {
      encoding: "utf8",
    });
    return contents;
  }
}
