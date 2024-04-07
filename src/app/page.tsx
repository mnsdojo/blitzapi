"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Result {
  results: string[];
  duration: number;
}
function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result | undefined>({
    results: [],
    duration: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      if (!input) return;
      const res = await fetch(`/api/search?q=${input}`);
      const data = (await res.json()) as Result;
      setResult(data);
    };
    fetchData();
  }, [input]);
  return (
    <main className="w-screen h-svh bg relative ">
      <div className="flex flex-col gap-6 relative items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <div className="flex items-center gap-2">
          <h1 className="text-5xl tracking-tight font-bold">BlitzApi</h1>
          <Image src="/bolt.jpg" width={30} height={30} alt="bolt_logo" />
        </div>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          A High-performance Api Built with Hono,NextJs and Cloudfare
        </p>

        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              className="placeholder:text-zinc-500"
              onValueChange={setInput}
              placeholder="Search ..."
            />
            <CommandList>
              {result?.results.length === 0 ? (
                <CommandEmpty>No Result Found</CommandEmpty>
              ) : null}

              {result?.results ? (
                <CommandGroup heading="Results">
                  {result?.results?.map((res) => (
                    <CommandItem key={res} value={res} onSelect={setInput}>
                      {res}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
            </CommandList>
          </Command>

          {result?.results ? (
            <div className="h-px w-full bg-zinc-200 mt-5">
              <p className="p-2 text-xs text-zinc-500">
                Found {result?.results.length} results in{" "}
                {result?.duration.toFixed(0)}ms
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <footer className="fixed bottom-0 w-full   text-center py-4">
        <div className="container mx-auto">
          <p className="font-normal">
            Made with Next.js, Hono, and Cloudflare Workers
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Page;
