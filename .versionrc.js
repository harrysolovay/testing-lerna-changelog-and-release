const fs = require("fs");
const path = require("path");
const {stream: PathStream} = require("fast-glob");
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
  scripts: {
    postchangelog: "prettier --write . --ignore-path=node_modules/**",
  },
};

function readVersion(contents) {
  return JSON.parse(contents).version;
}

const prettierOptions = JSON.parse(await fs.promises.readFile(path.resolve(__dirname, ".prettierrc"), {encoding: "utf8"}));

async function* getVersionBearingJsonFilePaths() {
  yield path.resolve(__dirname, "lerna.json");
  for await (const path of fg.stream(lernaGlobs, {
    absolute: true,
    cwd: process.cwd(),
    onlyDirectories: true,
  })) {
    yield [chunk.toString(), "package.json"].join(path.sep);
  }
}

async function writeVersion(contents, version) {
  for await (const path of getVersionBearingJsonFilePaths()) {
    // Do we care about preserving field order?
    const contents = JSON.parse(await fs.promises.readFile(pkgPath, {encoding: "utf8"}));
    contents.version = version;
    await fs.promises.writeFile(pkgPath, prettier.format(JSON.stringify(contents), prettierOptions), {
      encoding: "utf8",
    });
  }
}
