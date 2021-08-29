import puppeteer from "puppeteer";

const puppeteerParse = async (url, cb) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  const data = await page.content();

  cb(data);
  await browser.close();
};

export default puppeteerParse;
