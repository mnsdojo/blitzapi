export const runtime = "edge";

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { env } from "hono/adapter";
import { Redis } from "@upstash/redis";

const app = new Hono().basePath("/api");

type EnvConfig = {
  UPSTASH_REDIS_REST_TOKEN: string;
  UPSTASH_REDIS_REST_URL: string;
};

app.get("/search", async (c) => {
  try {
    const { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } =
      env<EnvConfig>(c);
    const redis = new Redis({
      token: UPSTASH_REDIS_REST_TOKEN,
      url: UPSTASH_REDIS_REST_URL,
    });
    const start = performance.now();
    const query = c.req.query("q")?.toUpperCase();

    if (!query) {
      return c.json({ message: "Invalid search query" });
    }
    const res = [];
    const rank = await redis.zrank("terms", query);
    if (rank !== null && rank !== undefined) {
      const temp = await redis.zrange<string[]>("terms", rank, rank + 100);
      for (const el of temp) {
        if (!el.startsWith(query)) {
          break;
        }
        if (el.endsWith("*")) {
          res.push(el.substring(0, el.length - 1));
        }
      }
    }

    const end = performance.now();

    return c.json({
      duration: end - start,
      results: res,
    });
  } catch (error) {
    console.log(error);
    return c.json({ results: [], message: "Something went wrong!" });
  }
});

export const GET = handle(app);
export const POST = handle(app);

export default app as never;
