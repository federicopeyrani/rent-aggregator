"use client";

import {
  StreamResponseChunk,
  streamSearchByQuery,
} from "@/app/search/search-by-query";
import { ResultsGrid } from "@/app/search/results-grid";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { ParsedRealEstate } from "core";
import { uniqBy } from "lodash";

const iterateStreamResponse = <T extends any>(
  streamResponse: Promise<StreamResponseChunk<T>>,
) => ({
  [Symbol.asyncIterator]: () => ({
    current: streamResponse,
    async next() {
      const { iteratorResult, next } = await this.current;

      if (next) {
        this.current = next;
      } else {
        iteratorResult.done = true;
      }

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

  const [partialItems, setPartialItems] = useState<ParsedRealEstate[]>([]);

  const { data, isLoading } = useSWR(
    ["search", city, _searchParams],
    async ([, city, query]) => {
      const response = streamSearchByQuery({ city, query });
      const iterator = iterateStreamResponse(response);

      setPartialItems([]);
      const data: ParsedRealEstate[] = [];

      for await (const result of iterator) {
        data.push(...result);
        setPartialItems((items) =>
          uniqBy([...items, ...result], ({ id }) => id),
        );
      }

      return data;
    },
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
  );

  const sortedItems = useMemo(
    () =>
      (data ?? [...partialItems])
        .filter((item) => item.photos.length > 2)
        .sort(
          (a, b) =>
            a.price +
            (a.condominiumExpenses ?? 0) -
            b.price -
            (b.condominiumExpenses ?? 0),
        ),
    [data, partialItems],
  );

  return <ResultsGrid isLoading={isLoading} data={sortedItems} />;
}
