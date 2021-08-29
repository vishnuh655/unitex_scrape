import scrapeMarketOverview from "./scrape.js";
import puppeteerParse from "./parse.js";

puppeteerParse("https://exchange.unitex.one/", async (data) => {
  const market = await scrapeMarketOverview(data);
  console.log(market);
});
