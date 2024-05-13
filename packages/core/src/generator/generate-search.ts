import { getInfo } from "../get-info";
import { toParsedRealEstate } from "../utils/to-parsed-real-estate";
import { generateResults } from "./generate-results";

export async function* generateSearch(
  location: string,
  query: string[][] | Record<string, string> | string | URLSearchParams,
) {
  const resultsStream = generateResults(location, query);

  for await (const results of resultsStream) {
    for (const result of results) {
      const details = await getInfo(result.realEstate.id);
      yield toParsedRealEstate(details);
    }
  }
}
