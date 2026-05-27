import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const GET: APIRoute = async () => {
  const filePath = join(process.cwd(), "public", "default-og.jpg");
  const data = await readFile(filePath);
  return new Response(new Uint8Array(data), {
    headers: { "Content-Type": "image/jpeg" },
  });
};
