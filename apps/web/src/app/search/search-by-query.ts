"use server";

import { generateSearch } from "core";

export interface SearchByUrlQuery {
  city: string;
  query: string[][] | Record<string, string> | string | URLSearchParams;
  contracts?: string[];
}

export type StreamResponseChunk<T> = {
  iteratorResult: IteratorResult<T>;
  next?: Promise<StreamResponseChunk<T>>;
};

const streamChunk = async <T>(generator: AsyncGenerator<T>) => {
  const next = generator.next();

  return new Promise<StreamResponseChunk<T>>((resolve, reject) => {
    next.then((res) => {
      if (res.done) {
        resolve({ iteratorResult: res });
        return;
      }

      resolve({ iteratorResult: res, next: streamChunk(generator) });
    });

    next.catch(reject);
  });
};

const streamResponse =
  <T, P extends any[]>(createGenerator: (...args: P) => AsyncGenerator<T>) =>
  (...args: Parameters<typeof createGenerator>) => {
    const generator = createGenerator(...args);
    return streamChunk<T>(generator);
  };

export const streamSearchByQuery = streamResponse(async function* ({
  city,
  query,
}: SearchByUrlQuery) {
  yield* generateSearch(city, query);
});
