"use server";

import { search } from "core";

export interface SearchByUrlParams {
  url: string;
  contracts: string[];
}

export const searchByUrl = async ({ url, contracts }: SearchByUrlParams) => {
  console.log("Searching by URL: ", url, contracts);

  const urlObject = new URL(url);
  const city = urlObject.pathname.split("/")[2];
  const allResults = await search(city, urlObject.searchParams);

  return allResults
    .filter(
      (result) => contracts.length === 0 || contracts.includes(result.contract),
    )
    .sort(
      (a, b) =>
        a.price +
        (a.condominiumExpenses ?? 0) -
        b.price -
        (b.condominiumExpenses ?? 0),
    );
};
