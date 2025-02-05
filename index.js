#!/usr/bin/env node

import process from "node:process";
import fs from "fs";

function countFileContent(data, options, filePath) {
  try {
    const lines = data.split("\n").length - 1;
    const words = data.split(/\s+/).filter((word) => word.length > 0).length;
    const characters = data.length;

    let output = "";
    if (options.l) output += `  ${lines}`;
    if (options.w) output += `  ${words}`;
    if (options.c) output += `  ${characters}`;
    if (!options.l && !options.w && !options.c)
      output = `  ${lines}  ${words}  ${characters}`;

    if (filePath) {
      console.log(`${output} ${filePath}`);
    } else {
      console.log(output);
    }
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

function convertFileToData(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseArgs(args) {
  const options = { l: false, w: false, c: false };
  const files = [];

  args.forEach((arg) => {
    if (arg.startsWith("-")) {
      if (arg.includes("l")) options.l = true;
      if (arg.includes("w")) options.w = true;
      if (arg.includes("c")) options.c = true;
    } else {
      files.push(arg);
    }
  });

  return { options, files };
}

function readStdIn(callback) {
  let data = "";
  process.stdin.on("readable", () => {
    let chunk;
    while (null !== (chunk = process.stdin.read())) {
      data += chunk;
    }
  });

  process.stdin.on("end", () => callback(data));
}

const { options, files } = parseArgs(process.argv.slice(2));

if (files.length > 0) {
  files.forEach((filePath) => {
    const data = convertFileToData(filePath);
    countFileContent(data, options, filePath);
  });
} else {
  readStdIn((data) => countFileContent(data, options));
}
