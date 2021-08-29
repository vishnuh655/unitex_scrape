import cheerio from "cheerio";

const scrapeMarketOverview = async (data) => {
  try {
    const $ = cheerio.load(data);

    const market = [];

    $(".markets_body-value > div").each((_idx, el) => {
      const marketPairName = $(".markets_body-value-item-pair", el)
        .text()
        .trim();
      const marketPairPrice = parseFloat(
        $(".markets_body-value-item-price", el).text()
      );
      const marketPairChange = $(".markets_body-value-item-change", el)
        .text()
        .trim();

      market.push({
        pairName: marketPairName,
        pairPrice: marketPairPrice,
        pairChange: marketPairChange,
      });
    });
    return market;
  } catch (error) {
    throw error;
  }
};

export default scrapeMarketOverview;
