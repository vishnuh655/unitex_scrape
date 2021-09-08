import { config } from "dotenv";
import chalk from "chalk";
import boxen from "boxen";
import yargs from "yargs";
import scrapeMarketOverview from "./scrape.js";
import puppeteerParse from "./parse.js";
import userAuth from "./userAuth.js";
import unitex from "./unitex.js";

config();

const greeting = chalk.white.bold(`Unitex Bot ${process.env.ENV}`);
const cli = yargs();

// --- SCRAPE COMMAND ----
cli.command({
  command: "scrape",
  describe: "Scrape Market Info from Production Site",
  handler(argv) {
    puppeteerParse("https://exchange.unitex.one/", async (parsedData) => {
      const market = await scrapeMarketOverview(parsedData);
      console.table(market);
    });
  },
});

// --- USER TOKEN COMMAND ----
cli.command({
  command: "fetch-token",
  describe: "Fetch User token",
  async handler(argv) {
    const token = await userAuth.getUserToken();
    console.log(token);
  },
});

// --- FEATURE TEST COMMAND ----
cli.command({
  command: "test",
  describe: "test",
  async handler(argv) {
    const data = await unitex.closeOrder(3);
    console.log(data);
  },
});

cli.parse(process.argv.slice(2));

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
};

const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);
