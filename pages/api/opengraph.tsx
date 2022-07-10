import { IncomingMessage, ServerResponse } from "http";
import { ScreenshotOptions } from "puppeteer-core";
import { parse } from "url";
import { getScreenshot } from "./_lib/chromium";

const isDev = !process.env.AWS_REGION;

const HOST = isDev ? "http://localhost:3000" : "https://shrirambalaji.com";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    console.log("HTTP " + req.url);
    const url = parse(req.url || "/", true);
    const queryString = new URLSearchParams(
      url.query as unknown as string
    ).toString();
    // @ts-ignore
    const fileType: ScreenshotOptions["type"] = url.query.fileType || "png";
    const file = await getScreenshot(
      `${HOST}/opengraph?${queryString}`,
      fileType,
      isDev
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<div style='display: grid; place-content: center; height: 100vh;  
        <h1 style='font-weight: 300;'>
          <strong>${res.statusCode}</strong>&nbsp;&nbsp;|&nbsp;&nbsp;<span>Sorry, there was an unexpected error.</span>
        </h1>
      </div>`
    );
    console.error(e);
  }
}
