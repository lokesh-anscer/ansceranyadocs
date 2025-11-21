const fs = require("fs");
const path = require("path");
const lodash = require("lodash");

const specSourcePath =
  process.env.API_SPEC_SOURCE || "api/ansceranya/api-1.0.22.json";
const outputPath =
  process.env.API_OUTPUT_PATH || "api/ansceranya/v1/api.json";
const resolvedSpecSourcePath = path.resolve(process.cwd(), specSourcePath);
const resolvedOutputPath = path.resolve(process.cwd(), outputPath);

if (!fs.existsSync(resolvedSpecSourcePath)) {
  console.warn(
    `API spec not found at ${resolvedSpecSourcePath}. Skipping tag enrichment.`
  );
  process.exit(0);
}

fs.readFile(resolvedSpecSourcePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    process.exitCode = 1;
    return;
  }

  try {
    const tagSet = new Set();
    const jsonData = JSON.parse(data);
    const paths = Object.keys(jsonData.paths);

    // Process each path and add tags
    const versionRegex = /\/v\d+\/([^/]+)/;
    paths.forEach((path) => {
      const match = path.match(versionRegex);
      let tag;

      if (match && match[1]) {
        tag = match[1];
      } else {
        tag = path.split("/")[1];
      }
      tagSet.add(tag);

      if (jsonData.paths[path].tags) {
        jsonData.paths[path].tags = [tag];
      }
      Object.keys(jsonData.paths[path]).forEach((key) => {
        if (jsonData.paths[path][key] && jsonData.paths[path][key].tags) {
          jsonData.paths[path][key].tags = [tag];
        }
      });
    });

    jsonData.tags = Array.from(tagSet, (item) => ({
      name: item,
      "x-displayName": lodash.startCase(item),
    }));

    const result = JSON.stringify(jsonData, null, 2);
    fs.mkdirSync(path.dirname(resolvedOutputPath), { recursive: true });
    fs.writeFile(resolvedOutputPath, result, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        process.exitCode = 1;
        return;
      }
      console.info(`API spec enriched at ${resolvedOutputPath}`);
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    process.exitCode = 1;
  }
});
