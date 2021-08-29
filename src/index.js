import scrapeMarketOverview from "./scrape.js";
import puppeteerParse from "./parse.js";

puppeteerParse("https://exchange.unitex.one/", async (parsedData) => {
  const market = await scrapeMarketOverview(parsedData);
  console.log(market);
});
