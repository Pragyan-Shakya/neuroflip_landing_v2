import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Neuroflip";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card: the brand mark centred on the brand purple. */
export default async function OpengraphImage() {
  const svg = await readFile(join(process.cwd(), "public/brand/logo.svg"));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#634A72" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> only */}
        <img src={logo} width={189} height={240} alt="" />
      </div>
    ),
    size,
  );
}
