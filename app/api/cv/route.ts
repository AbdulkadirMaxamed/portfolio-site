import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { cv } from "@/data/cv";
import { CVDocument } from "@/lib/cv-pdf";

export const runtime = "nodejs";

/**
 * GET /api/cv          → downloads the CV as a PDF (generated from data/cv.ts)
 * GET /api/cv?inline=1 → opens it in the browser's PDF viewer (used by "Print")
 */
export async function GET(request: Request) {
  const inline = new URL(request.url).searchParams.has("inline");
  const buffer = await renderToBuffer(createElement(CVDocument, { cv }) as Parameters<typeof renderToBuffer>[0]);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${cv.fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
