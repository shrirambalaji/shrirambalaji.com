import React from "react";
import { graphPaper } from "../util/backgroundPatterns";
import cn from "classnames";

export interface ImageProps {
  title: string;
  date?: string;
  highlight?: string;
  subtitle?: string;
}

const imageWidth = "1200px";
const imageHeight = "630px";

const OgImage: React.FC<ImageProps> = ({
  title = "",
  subtitle = "",
  date,
  highlight = "false",
}) => {
  const isCode = title.startsWith("`") && title.endsWith("`");
  if (isCode) title = title.substring(1).slice(0, -1);

  const titleFontStyle = isCode ? `font-mono` : `font-sans`;
  const shouldHighlightTitle = highlight === "true";
  const titleFontSize =
    title.length >= 40 ? "text-5xl leading-normal" : "text-7xl leading-tight";

  return (
    <div className="bg:ghostindigo-700 text-fg flex min-h-screen w-full items-center justify-center">
      <div
        id="preview relative"
        className=" flex h-full flex-col items-start justify-between p-[80px]"
        style={{
          backgroundImage: `${graphPaper}`,
          width: imageWidth,
          height: imageHeight,
        }}
      >
        {date && (
          <p className="font-regular font-sans text-lg text-ghostindigo-700">
            {date}
          </p>
        )}
        <div className="flex flex-col justify-center">
          <h1
            className={cn(
              `${titleFontStyle} ${titleFontSize}
            font-semibold  text-white`,
              {
                [`w-fit rounded-xl bg-indigo-400 px-[15px] text-center`]:
                  shouldHighlightTitle,
              }
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 font-sans text-2xl tracking-wide text-ghostindigo-300">
              {subtitle}
            </p>
          )}
        </div>
        <footer className="bottom-24">
          <p className="font-regular font-sans text-2xl text-ghostindigo-500">
            @shrirambalaji
          </p>
        </footer>
      </div>
    </div>
  );
};

export default OgImage;