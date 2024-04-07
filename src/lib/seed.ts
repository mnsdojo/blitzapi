import { Redis } from "@upstash/redis";
import { animeList } from "./data";

// Add Your Keys

const redis = new Redis({
  url: "",
  token: "",
});

animeList.forEach(async (anime) => {
  try {
    const term = anime.toUpperCase();
    const terms: { score: 0; member: string }[] = [];
    for (let i = 0; i <= term.length; i++) {
      terms.push({ score: 0, member: term.substring(0, i) });
    }
    terms.push({ score: 0, member: term + "*" });
    // @ts-ignore
    const result = await redis.zadd("terms", ...terms);
    console.log(`Seeded anime "${anime}" with ${result} items added.`);
  } catch (error) {
    console.error("Seed operation failed:", error);
  }
});
console.log("Seed operation completed.");
