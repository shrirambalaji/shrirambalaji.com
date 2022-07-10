import core, { ScreenshotOptions } from "puppeteer-core";
import { getOptions } from "./options";

let _page: core.Page;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);
  const browser = await core.launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(
  url: string,
  type: ScreenshotOptions["type"],
  isDev: boolean
) {
  const page = await getPage(isDev);
  await page.setViewport({ width: 2048, height: 1024, deviceScaleFactor: 2 });
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  const element = await page.$("#preview");
  return await element?.screenshot({ type });
}
