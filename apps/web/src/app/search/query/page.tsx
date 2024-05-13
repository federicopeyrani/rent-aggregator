"use client";

import {
  StreamResponseChunk,
  streamSearchByQuery,
} from "@/app/search/search-by-query";
import { ResultsGrid } from "@/app/search/results-grid";
import { Stack } from "@mantine/core";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { ParsedRealEstate } from "core";

const iterateStreamResponse = <T extends any>(
  streamResponse: Promise<StreamResponseChunk<T>>,
) => ({
  [Symbol.asyncIterator]: () => ({
    current: streamResponse,
    async next() {
      const { iteratorResult, next } = await this.current;

      if (next) this.current = next;
      else iteratorResult.done = true;

      return iteratorResult;
    },
  }),
});

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const city = searchParams.city;

  if (!city || typeof city !== "string") {
    throw new Error("Invalid search params");
  }

  const _searchParams = Object.entries(searchParams).flatMap(([key, value]) =>
    Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]],
  );

  const [items, setItems] = useState<ParsedRealEstate[]>([]);

  const { isLoading } = useSWR(
    ["search", city, _searchParams],
    async ([, city, query]) => {
      setItems([]);

      const response = streamSearchByQuery({ city, query });
      const iterator = iterateStreamResponse(response);

      for await (const result of iterator) {
        setItems((items) => [...items, result]);
      }
    },
  );

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          a.price +
          (a.condominiumExpenses ?? 0) -
          b.price -
          (b.condominiumExpenses ?? 0),
      ),
    [items],
  );

  return (
    <Stack gap={"md"} py={"xl"} px={"xl"}>
      <ResultsGrid isLoading={isLoading} data={sortedItems} />
    </Stack>
  );
}
