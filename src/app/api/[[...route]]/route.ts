export const runtime = "edge";

import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const animeList = [
  "Cowboy Bebop",
  "Fullmetal Alchemist: Brotherhood",
  "Neon Genesis Evangelion",
  "Attack on Titan",
  "Death Note",
  "One Piece",
  "Naruto",
  "Dragon Ball Z",
  "My Hero Academia",
  "Hunter x Hunter",
  "Spirited Away",
  "Princess Mononoke",
  "Akira",
  "Ghost in the Shell",
  "Samurai Champloo",
  "One Punch Man",
  "Sword Art Online",
  "Demon Slayer: Kimetsu no Yaiba",
  "Steins;Gate",
  "Code Geass",
  "Your Lie in April",
  "Clannad",
  "Fairy Tail",
  "Tokyo Ghoul",
  "JoJo's Bizarre Adventure",
  "Evangelion: 2.0 You Can (Not) Advance",
  "Evangelion: 3.0 You Can (Not) Redo",
  "Evangelion: 1.0 You Are (Not) Alone",
];

app.get("/search", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

export const GET = handle(app);
export const POST = handle(app);

export default app as never;
