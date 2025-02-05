#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";

program
  .version("1.0.0")
  .description("A utility for counting number of lines, words, characters and bytes in a file.")
  .option("-c, --count <file>", "Read number of bytes in a file")
  .option("-l, --lines <file>", "Read number of lines in a file")
  .option("-w, --words <file>", "Read number of words in a file")
  .option("-m, --chars <file>", "Read number of characters in a file")
  .argument("[file]")
  .action((file, options) => {
    if (options.count) {
      try {
        const stats = fs.statSync(options.count);
        console.log(`${stats.size} ${options.count}`)
      } catch (err) {
        console.error(err);
      }
    } else if (options.lines) {
      try {
        const data = fs.readFileSync(options.lines, "utf8");
        const lines = data.split("\n").length;
        console.log(`${lines} ${options.lines}`);
      } catch (err) {
        console.error(err);
      }
    } else if (options.words) {
      try {
        const data = fs.readFileSync(options.words, "utf8");
        const wordCount = data.split(/\s+/).filter(w => w.length > 0).length;
        console.log(`${wordCount} ${options.words}`);
      } catch (err) {
        console.error(err);
      }
    } else if (options.chars) {
      try {
        const data = fs.readFileSync(options.chars, "utf8");
        const charCount = data.length;
        console.log(`${charCount} ${options.chars}`);
      } catch (err) {
        console.log(err);
      }
    } else if (file) {
      try {
        const lines = fs.readFileSync(options, "utf8").split("\n").length;
        const words = fs.readFileSync(options, "utf8").split(/\s+/).filter(w => w.length > 0).length;
        const chars = fs.readFileSync(options, "utf8").length;

        console.log(`${lines} ${words} ${chars} ${file}`);
      } catch (err) {
        console.error(err);
      }

    }
  });

program.parse(process.argv);
