import { getResultsRaw } from "../get-results-raw";

export async function* generateResults(
  location: string,
  query: string[][] | Record<string, string> | string | URLSearchParams,
) {
  const queryParams = new URLSearchParams(query);
  queryParams.set("pag", "1");

  const data = await getResultsRaw(location, queryParams);
  yield data.results;

  for (let i = 2; i <= data.maxPages; i++) {
    queryParams.set("pag", i.toString());
    const data = await getResultsRaw(location, queryParams);
    yield data.results;
  }
}
