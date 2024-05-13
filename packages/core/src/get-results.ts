import { getResultsRaw } from "./get-results-raw.ts";

export const getResults = async (
  location: string,
  query: string[][] | Record<string, string> | string | URLSearchParams,
) => {
  const queryParams = new URLSearchParams(query);
  queryParams.set("pag", "1");

  const data = await getResultsRaw(location, queryParams);
  const results = data.results;

  for (let i = 2; i <= data.maxPages; i++) {
    queryParams.set("pag", i.toString());
    const nextData = await getResultsRaw(location, queryParams);
    results.push(...nextData.results);
  }

  return results;
};
