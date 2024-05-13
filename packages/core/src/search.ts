import { getInfo } from "./get-info";
import { getResults } from "./get-results";
import { toParsedRealEstate } from "./utils/to-parsed-real-estate";

export const search = async (
  location: string,
  query: string[][] | Record<string, string> | string | URLSearchParams,
) => {
  const results = await getResults(location, query);

  const details = await Promise.all(
    results.map((result) => getInfo(result.realEstate.id)),
  );

  return details.map(toParsedRealEstate);
};
