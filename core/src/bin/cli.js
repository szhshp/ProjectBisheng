#!/usr/bin/env node

import { format } from "../formatters";
import fs from "fs";
import yargs from "yargs";

// Use yargs to parse command-line arguments
const argv = yargs(process.argv.slice(2))
  .option("markdownLinksInFullWidth", {
    type: "boolean",
    description: "Enable full-width markdown links",
  })
  .option("boldTextBlock", {
    type: "boolean",
    description: "Enable bold text block",
  })
  .option("blankLines", {
    type: "boolean",
    description: "Enable blank lines",
  })
  .option("duplicatedPunctuations", {
    type: "boolean",
    description: "Enable duplicated punctuations",
  })
  .option("fullWidthCharsAndFollowingSpaces", {
    type: "boolean",
    description: "Enable full-width characters and following spaces",
  })
  .option("addSpacesBetweenChineseCharAndAlphabeticalChar", {
    type: "boolean",
    description: "Add spaces between Chinese characters and alphabetical characters",
  })
  .option("halfWidthCharsAndFollowingSpaces", {
    type: "boolean",
    description: "Enable half-width characters and following spaces",
  })
  .option("useSimpleQuotation", {
    type: "boolean",
    description: "Use simple quotation marks",
  })
  .option("ellipsisCount", {
    type: "number",
    choices: [3, 6],
    description: "Choose ellipsis count (3 or 6)",
  })
  .argv;

// Get file paths from arguments
const files = argv._;

// Create BishengMainConfig based on arguments
const config =

{
  mainFeature: {
    markdownLinksInFullWidth: argv.markdownLinksInFullWidth || true,
    boldTextBlock: argv.boldTextBlock || true,
    blankLines: argv.blankLines || true,
    duplicatedPunctuations: argv.duplicatedPunctuations || true,
    fullWidthCharsAndFollowingSpaces: argv.fullWidthCharsAndFollowingSpaces || true,
    addSpacesBetweenChineseCharAndAlphabeticalChar: argv.addSpacesBetweenChineseCharAndAlphabeticalChar || true,
    halfWidthCharsAndFollowingSpaces: argv.halfWidthCharsAndFollowingSpaces || true,
  },
  useSimpleQuotation: argv.useSimpleQuotation || true,
  ellipsisCount: argv.ellipsisCount || 3,
};

// If no files are provided, remind the user
if (files.length === 0) {
  console.log("Please provide a file path: format <file-path>");
} else {
  files.forEach((file) => {
    try {
      // Read the content of the file
      const content = fs.readFileSync(file, { encoding: "utf-8" });

      // Format the content using the configuration
      const formattedContent = format(content, config);
      console.log('formattedContent: ', formattedContent === content);

      // Write the formatted content back to the file
      fs.writeFileSync(file, formattedContent, { encoding: "utf-8" });

      // Log success message
      console.log(`File formatted successfully: ${file}`);
    } catch (error) {
      console.log('error: ', error);
      // Handle any errors (e.g., file not found, permission issues)
      console.error(`Error formatting file: ${file}`, error);
    }
  });
}